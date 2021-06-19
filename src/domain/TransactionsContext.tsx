import React, {FunctionComponent, useState} from 'react'
import {Transaction} from 'domain/Transaction'
import {replaceAt} from 'utility/utilities'

export type TransactionsContext = Readonly<{
  transactions: Transaction[],
  saveTransaction: (transaction: Transaction) => void
}>


const context = React.createContext<TransactionsContext>({
  transactions: [],
  saveTransaction: () => {}
})

export const TransactionsContextConsumer = context.Consumer

const replaceOrAdd = (transactions: Transaction[], value: Transaction): Transaction[] => {
  const index = transactions.map(t => t.uuid).indexOf(value.uuid)
  if (index >= 0) {
    return replaceAt(transactions, index, value)
  }
  return [...transactions, value]
}

export const TransactionsContextProvider: FunctionComponent<Record<string, unknown>> = (props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const contextValue: TransactionsContext = {
    transactions,
    saveTransaction: (t) => {
      const newList = replaceOrAdd(transactions, t)
      setTransactions(newList)
    }
  }

  return <context.Provider value={contextValue}>{props.children}</context.Provider>
}