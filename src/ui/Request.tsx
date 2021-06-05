import React from 'react'
import {HTTP_METHODS, HttpMethod} from 'utility/constants'

type RequestProps = Readonly<{
  method: HttpMethod
  onMethodChanged: (h: HttpMethod) => void
  onUriChanged: (u: string) => void
  onSendPressed: () => void
}>

export const Request = (props: RequestProps) => {
  return (
    <section>
      <select>
        {HTTP_METHODS.map(m => <option key={m} selected={props.method === m}>{m}</option>)}
      </select>
      <input type='text' onChange={(e) => props.onUriChanged(e.target.value)}/>
    </section>
  )
}