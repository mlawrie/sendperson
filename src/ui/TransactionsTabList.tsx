import React from 'react'
import {useTransactionsContext} from 'domain/TransactionsContext'
import {TabList} from 'ui/shared/TabList'
import {filter, flip, includes, indexOf, pipe, where} from 'ramda'
import {getTransactionTitle} from 'domain/Transaction'

const isIn = flip(includes)

export const TransactionsTabList = () => {

  const context = useTransactionsContext()
  const uuidForIndex = (index: number) => context.visibleUuids[index]

  const onSelected = pipe(uuidForIndex, context.highlightTransaction)
  const selectedIndex = indexOf(context.highlightedUuid, context.visibleUuids)
  const visibleTransactions = filter(where({uuid: isIn(context.visibleUuids)}), context.transactions)

  return <TabList items={visibleTransactions}
                  selected={selectedIndex}
                  renderTitle={getTransactionTitle}
                  getId={t => t.uuid}
                  onSelected={onSelected}/>
}