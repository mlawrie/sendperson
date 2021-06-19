import * as React from 'react'
import styles from 'ui/App.scss'
import {TransactionsContextProvider} from 'domain/TransactionsContext'
import {TransactionsTabList} from 'ui/TransactionsTabList'
import {TransactionLayout} from 'ui/TransactionLayout'

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