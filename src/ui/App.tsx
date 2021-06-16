import * as React from 'react'
import {RequestForm} from 'ui/request/RequestForm'
import {useState} from 'react'
import {defaultRequest, Request} from 'domain/Request'
import styles from 'ui/App.scss'

export const App = () => {
  const [request, setRequest] = useState(defaultRequest())

  const onRequestChanged = (request: Request) => {
    setRequest(request)
  }

  return (<div className={`container-fluid ${styles.container}`}>
    <div className='row'>
      <div className='col-md-6'>
      <RequestForm request={request} onRequestChanged={onRequestChanged} onSendPressed={() => {}}/>
      </div>
      <div className='col-md-6' style={{backgroundColor: '#eee'}}>response form</div>
    </div>
  </div>)
}