import * as React from 'react'
import {FunctionComponent} from 'react'
import {RequestForm} from 'ui/request/RequestForm'
import {Request} from 'domain/Request'
import styles from 'ui/App.scss'
import SplitPane, {Pane} from 'react-split-pane'
import {TransactionsContextProvider, useTransactionsContext} from 'domain/TransactionsContext'
import {TransactionsTabList} from 'ui/TransactionsTabList'
import {equals, find, where} from 'ramda'

const TwoPane: FunctionComponent<Readonly<{ left: JSX.Element, right: JSX.Element }>> = ({left, right}) =>
  <SplitPane className={styles.splitPane} split="vertical" defaultSize={'50%'} minSize={200}>
    <Pane>
      <div className={`container-fluid ${styles.container}`}>
        {left}
      </div>
    </Pane>
    <Pane>
      <div className={styles.scroller}>
        <div className={`container-fluid ${styles.container}`}>
          {right}
        </div>
      </div>
    </Pane>
  </SplitPane>

const TransactionLayout = () => {
  const {transactions, highlightedUuid, updateTransaction} = useTransactionsContext()
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

export const App = () => {

  return <div>
    <TransactionsContextProvider>
      <header className={`${styles.navbar} fixed-top bg-dark navbar-dark`}>
        <div className={styles.tabList}>
          <TransactionsTabList/>
        </div>
        <div className={styles.brandWrapper}>
          <a className="navbar-brand" href="#">Sendperson</a>
        </div>
      </header>

      <TransactionLayout/>
    </TransactionsContextProvider>
  </div>
}