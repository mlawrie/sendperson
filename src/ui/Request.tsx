import React from 'react'
import {HTTP_METHODS, HttpMethod, layout} from 'utility/constants'
import styled from 'styled-components'

type RequestProps = Readonly<{
  method: HttpMethod
  onMethodChanged: (h: HttpMethod) => void
  onUriChanged: (u: string) => void
  onSendPressed: () => void
}>

const Select = styled.select`
    ${layout.largeInput}
    width: 120px;
    display: flex;
  `

const Input = styled.input`
    ${layout.largeInput}
    margin-left: 20px;
    display: flex;
    flex-grow: 1;
  `

const Button = styled.button`
    ${layout.largeInput}
    margin-left: 20px;
    display: flex;
  `

const Section = styled.section`
    display: flex;
    flex-direction: row;
  `

export const Request = (props: RequestProps) => {

  return (
    <Section>
      <Select defaultValue={props.method}>
        {HTTP_METHODS.map(m => <option key={m}>{m}</option>)}
      </Select>
      <Input type='text' onChange={(e) => props.onUriChanged(e.target.value)}/>
      <Button onClick={() => props.onSendPressed()}>Send</Button>
    </Section>
  )
}