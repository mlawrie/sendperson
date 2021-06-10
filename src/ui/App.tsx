import * as React from 'react'
import {RequestForm} from 'ui/request/RequestForm'
import {useState} from 'react'
import {defaultRequest, Request} from 'domain/Request'

export const App = () => {
  const [request, setRequest] = useState(defaultRequest())

  const onRequestChanged = (request: Request) => {
    setRequest(request)
  }
  
  return (<div>
    <h1>sendperson</h1>
    <RequestForm request={request} onRequestChanged={onRequestChanged} onSendPressed={() => {}}/>
  </div>)
}