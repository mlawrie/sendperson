import React, {FunctionComponent, useState} from 'react'
import {defaultTransaction, Transaction} from 'domain/Transaction'
import {curry2, replaceAt} from 'utility/utilities'
import R, {append, flip, pipe, uniqBy} from 'ramda'

type TransactionsState = Readonly<{
  transactions: Transaction[],
  visibleUuids: string[],
  highlightedUuid: string
}>

export type TransactionsContext = TransactionsState & Readonly<{
  saveTransaction: (transaction: Transaction) => void
  updateTransaction: (uuid: string, t: Partial<Transaction>) => void
}>


const context = React.createContext<TransactionsContext>({
  transactions: [],
  visibleUuids: [],
  highlightedUuid: '',
  saveTransaction: () => {
  },
  updateTransaction: () => {
  }
})

export const TransactionsContextConsumer = context.Consumer

const getExisting = (transactions: Transaction[], uuid: string): Transaction => {
  return transactions.filter(t => t.uuid === uuid)[0]
}

const replaceOrAdd = (transactions: Transaction[], value: Transaction): Transaction[] => {
  const index = transactions.map(t => t.uuid).indexOf(value.uuid)
  if (index >= 0) {
    return replaceAt(transactions, index, value)
  }
  return [...transactions, value]
}

const getInitialState = (): TransactionsState => {
  const initialTransaction = defaultTransaction()
  return {
    transactions: [initialTransaction],
    highlightedUuid: initialTransaction.uuid,
    visibleUuids: [initialTransaction.uuid]
  }
}

const appendTo = flip(append)
const uniqueUuid = uniqBy((uuid: string) => uuid)

export const TransactionsContextProvider: FunctionComponent<Record<string, unknown>> = (props) => {
  const initialState = getInitialState()

  const [transactions, setTransactions] = useState<TransactionsState['transactions']>(initialState.transactions)
  const [highlightedUuid, setHighlightedUuid] = useState<TransactionsState['highlightedUuid']>(initialState.highlightedUuid)
  const [visibleUuids, setVisibleUuids] = useState<TransactionsState['visibleUuids']>(initialState.visibleUuids)

  const addVisibleUuid = pipe(appendTo(visibleUuids), uniqueUuid, setVisibleUuids)
  const addTransaction = pipe(curry2(replaceOrAdd)(transactions), setTransactions)
  const getUpdated = (uuid: string, t: Partial<Transaction>): Transaction => ({...getExisting(transactions, uuid), ...t})

  const saveTransaction = (t: Transaction) => {
    addTransaction(t)
    setHighlightedUuid(t.uuid)
    addVisibleUuid(t.uuid)
  }

  const contextValue: TransactionsContext = {
    transactions,
    highlightedUuid,
    visibleUuids,
    saveTransaction,
    updateTransaction: pipe(getUpdated, saveTransaction)
  }

  return <context.Provider value={contextValue}>{props.children}</context.Provider>
}