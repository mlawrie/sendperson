import React, {Fragment} from 'react'
import {BODY_FORMATS, FORM_FIELDS_BODY_FORMATS, RequestBody, TEXT_BODY_FORMATS} from 'domain/Request'
import styled from 'styled-components'
import {ParamsForm} from 'ui/request/ParamsForm'
import {pipe} from 'ramda'
import {assignTo, eventValue, withDefaults} from 'utility/utilities'


const TextBodyForm = (props: Readonly<{ onTextChanged: (a: string) => void, text: string }>) => {
  const {text, onTextChanged} = props
  return <Fragment>
    <textarea data-testid="request body text" value={text} onChange={pipe(eventValue, onTextChanged)}/>
  </Fragment>
}


type Props = Readonly<{
  body: RequestBody
  onBodyChanged: (p: RequestBody) => void
}>

const Select = styled.select`
`

export const BodyForm = (props: Props) => {
  const {body, onBodyChanged} = props

  const onChanged = pipe(withDefaults(body), onBodyChanged)
  const onFormatChanged = pipe(assignTo<RequestBody>('format'), onChanged)
  const onParamsChanged = pipe(assignTo<RequestBody>('fields'), onChanged)
  const onTextChanged = pipe(assignTo<RequestBody>('text'), onChanged)

  const paramsElement = <ParamsForm entityName="form field"
                                    entityNamePluralCapitalized="Form Fields"
                                    params={body.fields}
                                    onParamsChanged={onParamsChanged}
  />

  const textElement = <TextBodyForm text={body.text} onTextChanged={onTextChanged}/>

  return <section data-testid="request body">
    <h3>Request Body</h3>
    <Select defaultValue={body.format}
            onChange={pipe(eventValue, onFormatChanged)}
            data-testid="format input">
      {BODY_FORMATS.map(bf => <option key={bf}>{bf}</option>)}
    </Select>
    {TEXT_BODY_FORMATS.includes(body.format) ? textElement : <Fragment/>}
    {FORM_FIELDS_BODY_FORMATS.includes(body.format) ? paramsElement : <Fragment/>}
  </section>
}
