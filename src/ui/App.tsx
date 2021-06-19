import * as React from 'react'
import {RequestForm} from 'ui/request/RequestForm'
import {Request} from 'domain/Request'
import styles from 'ui/App.scss'
import SplitPane, {Pane} from 'react-split-pane'
import {TransactionsContext, TransactionsContextConsumer, TransactionsContextProvider} from 'domain/TransactionsContext'


const RequestFormFor = (props: Readonly<{index: number, context: TransactionsContext}>) => {
  const {context, index} = props
  const transaction = context.transactions[index]

  return <RequestForm request={transaction.request}
                      onRequestChanged={(request: Request) => {
                        context.updateTransaction(transaction.uuid, {request})
                      }}
                      onSendPressed={() => {
                      }}
  />
}

export const App = () => {

  return <div>
    <TransactionsContextProvider>
      <header className="navbar fixed-top bg-dark navbar-dark">
        <div className={styles.header}>
          <a className="navbar-brand" href="#">Sendperson</a>
        </div>
      </header>
      <SplitPane className={styles.splitPane} split="vertical" defaultSize={'50%'} minSize={200}>
        <Pane>
          <div className={`container-fluid ${styles.container}`}>
            <TransactionsContextConsumer>
              {context => <RequestFormFor index={0} context={context}/>}
            </TransactionsContextConsumer>
          </div>
        </Pane>
        <Pane>
          <div className={styles.scroller}>
            <div className={`container-fluid ${styles.container}`}>
              <h3>Response</h3>
            </div>
          </div>
        </Pane>
      </SplitPane>
    </TransactionsContextProvider>
  </div>
}