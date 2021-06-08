import React from 'react'
import {layout} from 'utility/constants'
import styled from 'styled-components'
import {HTTP_METHODS, Request} from 'domain/Request'
import {QueryParamsForm} from 'ui/request/QueryParamsForm'
import {onChangedElementInRecord} from 'utility/onChangedElementInRecord'

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

type Props = Readonly<{
  request: Request
  onRequestChanged: (r: Request) => void
  onSendPressed: () => void
}>

export const RequestForm = (props: Props) => {
  const {request, onRequestChanged, onSendPressed} = props
  const onChanged = onChangedElementInRecord(onRequestChanged, request)

  return (
    <div>
      <Section>
        <Select defaultValue={request.method}
                onChange={onChanged('method')}
                data-testid="method input">
          {HTTP_METHODS.map(m => <option key={m}>{m}</option>)}
        </Select>
        <Input type="text" value={request.uri}
               onChange={onChanged('uri')}
               data-testid="uri input"/>
        <Button onClick={() => onSendPressed()} data-testid="send button">Send</Button>
      </Section>
      <QueryParamsForm queryParams={request.queryParams}
                       onQueryParamsChanged={onChanged('queryParams')}/>
    </div>
  )
}