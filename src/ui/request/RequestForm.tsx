import React from 'react'
import {layout} from 'utility/constants'
import styled from 'styled-components'
import {HTTP_METHODS, Request} from 'domain/Request'
import {ParamsForm} from 'ui/request/ParamsForm'
import {assignTo, eventValue, withDefaults} from 'utility/utilities'
import {pipe} from 'ramda'
import {BodyForm} from 'ui/request/BodyForm'

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

const Container = styled.div`
    padding: ${layout.padding}
  `

type Props = Readonly<{
  request: Request
  onRequestChanged: (r: Request) => void
  onSendPressed: () => void
}>

export const RequestForm = (props: Props) => {
  const {request, onRequestChanged, onSendPressed} = props

  const onChanged = pipe(withDefaults(request), onRequestChanged)
  const onUriChanged = pipe(assignTo<Request>('uri'), onChanged)
  const onMethodChanged = pipe(assignTo<Request>('method'), onChanged)
  const onParamsChanged = pipe(assignTo<Request>('queryParams'), onChanged)
  const onHeadersChanged = pipe(assignTo<Request>('headers'), onChanged)
  const onBodyChanged = pipe(assignTo<Request>('body'), onChanged)

  return (
    <Container>
      <Section>
        <Select defaultValue={request.method}
                onChange={pipe(eventValue, onMethodChanged)}
                data-testid="method input">
          {HTTP_METHODS.map(m => <option key={m}>{m}</option>)}
        </Select>
        <Input type="text" value={request.uri}
               onChange={pipe(eventValue, onUriChanged)}
               data-testid="uri input"/>
        <Button onClick={() => onSendPressed()} className={'btn btn-primary'} data-testid="send button">Send</Button>
      </Section>
      <ParamsForm params={request.queryParams}
                  entityName="query param"
                  entityNamePluralCapitalized="Query Params"
                  onParamsChanged={onParamsChanged}/>
      <ParamsForm params={request.headers}
                  entityName="header"
                  entityNamePluralCapitalized="Headers"
                  onParamsChanged={onHeadersChanged}/>
      <BodyForm body={request.body} onBodyChanged={onBodyChanged}/>
    </Container>
  )
}