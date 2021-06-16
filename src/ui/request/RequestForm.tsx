import React from 'react'
import {HTTP_METHODS, Request} from 'domain/Request'
import {ParamsForm} from 'ui/request/ParamsForm'
import {assignTo, eventValue, withDefaults} from 'utility/utilities'
import {pipe} from 'ramda'
import {BodyForm} from 'ui/request/BodyForm'

import styles from './RequestForm.scss'

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
    <div>
      <h3>Request</h3>
      <section className="row">
        <div className="col-3">
          <select defaultValue={request.method}
                  className="form-select form-select-lg"
                  onChange={pipe(eventValue, onMethodChanged)}
                  data-testid="method input">
            {HTTP_METHODS.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="col-7">
          <input type="text" value={request.uri}
                 className="form-control form-control-lg"
                 onChange={pipe(eventValue, onUriChanged)}
                 data-testid="uri input"/>
        </div>
        <div className="col-2">
          <button onClick={() => onSendPressed()} className={`btn btn-lg btn-primary ${styles.send}`} data-testid="send button">Send</button>
        </div>
      </section>
      <ParamsForm params={request.queryParams}
                  entityName="query param"
                  entityNamePluralCapitalized="Query Params"
                  onParamsChanged={onParamsChanged}/>
      <ParamsForm params={request.headers}
                  entityName="header"
                  entityNamePluralCapitalized="Headers"
                  onParamsChanged={onHeadersChanged}/>
      <BodyForm body={request.body} onBodyChanged={onBodyChanged}/>
    </div>
  )
}