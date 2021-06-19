import * as React from 'react'
import {FunctionComponent} from 'react'
import SplitPane, {Pane} from 'react-split-pane'
import {useTransactionsContext} from 'domain/TransactionsContext'
import {equals, find, where} from 'ramda'
import {RequestForm} from 'ui/request/RequestForm'
import {Request} from 'domain/Request'

import styles from 'ui/TransactionLayout.scss'

const TwoPane: FunctionComponent<Readonly<{ left: JSX.Element, right: JSX.Element }>> = ({left, right}) =>
  <SplitPane className={styles.splitPane} split="vertical" defaultSize={'50%'} minSize={200}>
    <Pane className="">
      <div className={`container-fluid`}>
        {left}
      </div>
    </Pane>
    <Pane className="">
      <div className={`container-fluid`}>
        {right}
      </div>
    </Pane>
  </SplitPane>

export const TransactionLayout = () => {
  const {transactions, highlightedUuid, updateTransaction, visibleUuids} = useTransactionsContext()

  if (visibleUuids.length === 0) {
    return <section className={styles.noVisibleMessage}>
      <p>Click the plus icon in the menu bar to get started</p>
    </section>
  }

  const transaction = find(where({uuid: equals(highlightedUuid)}), transactions)

  const left = <RequestForm request={transaction.request}
                            onRequestChanged={(request: Request) => {
                              updateTransaction(transaction.uuid, {request})
                            }}
                            onSendPressed={() => {
                            }}/>

  return <TwoPane
    left={left}
    right={<h3>Response</h3>}
  />
}
