import React, {FunctionComponent, useState} from 'react'
import {defaultTransaction, Transaction} from 'domain/Transaction'
import {curry2, replaceAt} from 'utility/utilities'
import {mergeLeft, mergeRight, pipe} from 'ramda'

export type TransactionsContext = Readonly<{
  transactions: Transaction[],
  saveTransaction: (transaction: Transaction) => void
  updateTransaction: (uuid: string, t: Partial<Transaction>) => void
}>


const context = React.createContext<TransactionsContext>({
  transactions: [],
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

export const TransactionsContextProvider: FunctionComponent<Record<string, unknown>> = (props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([defaultTransaction()])

  const saveTransaction = (t: Transaction) => {
    const newList = replaceOrAdd(transactions, t)
    setTransactions(newList)
  }

  const getUpdated = (uuid: string, t: Partial<Transaction>): Transaction => ({...getExisting(transactions, uuid), ...t})

  const contextValue: TransactionsContext = {
    transactions,
    saveTransaction,
    updateTransaction: pipe(getUpdated, saveTransaction)
  }

  return <context.Provider value={contextValue}>{props.children}</context.Provider>
}