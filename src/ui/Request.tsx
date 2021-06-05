import React from 'react'
import {HTTP_METHODS, HttpMethod, layout} from 'utility/constants'
import styled from 'styled-components'

type RequestProps = Readonly<{
  method: HttpMethod
  onMethodChanged: (h: HttpMethod) => void
  onUriChanged: (u: string) => void
  onSendPressed: () => void
}>

export const Request = (props: RequestProps) => {
  const Select = styled.select`
    border: 1px solid #ddd;
    padding: 0 10px;
    height: ${layout.largeComponent.height};
    ${layout.borderRadius}
  `

  return (
    <section>
      <Select defaultValue={props.method}>
        {HTTP_METHODS.map(m => <option key={m}>{m}</option>)}
      </Select>
      <input type='text' onChange={(e) => props.onUriChanged(e.target.value)}/>
    </section>
  )
}