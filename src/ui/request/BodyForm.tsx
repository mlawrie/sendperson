import React, {Fragment} from 'react'
import {BODY_FORMATS, FORM_FIELDS_BODY_FORMATS, RequestBody, TEXT_BODY_FORMATS} from 'domain/Request'
import {ParamsForm} from 'ui/request/ParamsForm'
import {pipe} from 'ramda'
import {assignTo, eventValue, withDefaults} from 'utility/utilities'
import {TextBodyForm} from 'ui/request/TextBodyForm'
import styles from './BodyForm.scss'

type Props = Readonly<{
  body: RequestBody
  onBodyChanged: (p: RequestBody) => void
}>

export const BodyForm = (props: Props) => {
  const {body, onBodyChanged} = props

  const onChanged = pipe(withDefaults(body), onBodyChanged)
  const onFormatChanged = pipe(assignTo<RequestBody>('format'), onChanged)
  const onParamsChanged = pipe(assignTo<RequestBody>('fields'), onChanged)
  const onTextChanged = pipe(assignTo<RequestBody>('text'), onChanged)

  const paramsElement = <ParamsForm entityName='form field'
                                    entityNamePluralCapitalized='Form Fields'
                                    params={body.fields}
                                    onParamsChanged={onParamsChanged}
  />

  const textElement = <TextBodyForm format={body.format} text={body.text} onTextChanged={onTextChanged}/>

  return <section data-testid='request body' className={styles.container}>
    <h6>Request Body</h6>

    <select defaultValue={body.format}
            className='form-select form-select-sm'
            onChange={pipe(eventValue, onFormatChanged)}
            data-testid='format input'>
      {BODY_FORMATS.map(bf => <option key={bf}>{bf}</option>)}
    </select>

    {TEXT_BODY_FORMATS.includes(body.format) ? textElement : <Fragment/>}
    {FORM_FIELDS_BODY_FORMATS.includes(body.format) ? paramsElement : <Fragment/>}
  </section>
}
