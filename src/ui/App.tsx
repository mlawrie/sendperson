import * as React from 'react'
import {useState} from 'react'
import {RequestForm} from 'ui/request/RequestForm'
import {defaultRequest, Request} from 'domain/Request'
import styles from 'ui/App.scss'
import SplitPane, {Pane} from 'react-split-pane'

export const App = () => {
  const [request, setRequest] = useState(defaultRequest())

  const onRequestChanged = (request: Request) => {
    setRequest(request)
  }

  return <div>
    <header className='navbar fixed-top bg-dark navbar-dark'>
      <div className={styles.header}>
        <a className='navbar-brand' href='#'>Sendperson</a>
      </div>
    </header>
    <SplitPane className={styles.splitPane} split='vertical' defaultSize={'50%'} minSize={200}>
      <Pane>
        <div className={`container-fluid ${styles.container}`}>
          <RequestForm request={request} onRequestChanged={onRequestChanged} onSendPressed={() => {
          }}/>
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
  </div>
}