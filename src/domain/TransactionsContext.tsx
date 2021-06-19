import React, {FunctionComponent, useContext, useState} from 'react'
import {defaultTransaction, Transaction} from 'domain/Transaction'
import {curry2, replaceAt} from 'utility/utilities'
import {append, filter, flip, nth, pipe, uniqBy} from 'ramda'

type TransactionsState = Readonly<{
  transactions: Transaction[],
  visibleUuids: string[],
  highlightedUuid: string
}>

export type TransactionsContext = TransactionsState & Readonly<{
  saveTransaction: (transaction: Transaction) => void
  updateTransaction: (uuid: string, t: Partial<Transaction>) => void
  highlightTransaction: (uuid: string) => void
  hideTransaction: (uuid: string) => void
}>


const context = React.createContext<TransactionsContext>({
  transactions: [],
  visibleUuids: [],
  highlightedUuid: '',
  saveTransaction: () => {
  },
  updateTransaction: () => {
  },
  highlightTransaction: () => {
  },
  hideTransaction: () => {
  }
})

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
const initialState = getInitialState()

const appendTo = flip(append)
const filteredFrom = <T, U>(haystack: T[]) => (needle: T) => filter(i => i !== needle, haystack)

const uniqueUuid = uniqBy((uuid: string) => uuid)

export const TransactionsContextProvider: FunctionComponent<Record<string, unknown>> = (props) => {

  const [transactions, setTransactions] = useState<TransactionsState['transactions']>(initialState.transactions)
  const [highlightedUuid, setHighlightedUuid] = useState<TransactionsState['highlightedUuid']>(initialState.highlightedUuid)
  const [visibleUuids, setVisibleUuids] = useState<TransactionsState['visibleUuids']>(initialState.visibleUuids)

  const addVisibleUuid = pipe(appendTo(visibleUuids), uniqueUuid, setVisibleUuids)
  const removeVisibleUuid = pipe(filteredFrom(visibleUuids), setVisibleUuids)
  const addTransaction = pipe(curry2(replaceOrAdd)(transactions), setTransactions)
  const setNextHighlighted = pipe(filteredFrom(visibleUuids), nth(-1), setHighlightedUuid)
  const getUpdated = (uuid: string, t: Partial<Transaction>): Transaction => ({...getExisting(transactions, uuid), ...t})

  const saveTransaction = (t: Transaction) => {
    addTransaction(t)
    setHighlightedUuid(t.uuid)
    addVisibleUuid(t.uuid)
  }

  const hideTransaction = (uuid: string) => {
    removeVisibleUuid(uuid)
    setNextHighlighted(uuid)
  }

  const contextValue: TransactionsContext = {
    transactions,
    highlightedUuid,
    visibleUuids,
    saveTransaction,
    highlightTransaction: setHighlightedUuid,
    hideTransaction,
    updateTransaction: pipe(getUpdated, saveTransaction)
  }

  return <context.Provider value={contextValue}>{props.children}</context.Provider>
}

export const transactionsContextInstance = context
export const useTransactionsContext = () => useContext(context)
