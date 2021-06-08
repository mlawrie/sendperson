import React from 'react'
import {defaultQueryParam, QueryParam} from 'domain/Request'
import {replaceAt} from 'utility/replaceAt'
import {onChangedElementInRecord} from 'utility/onChangedElementInRecord'

const ParamForm = (props: Readonly<{ param: QueryParam, onQueryParamChanged: (p: QueryParam) => void }>) => {
  const {onQueryParamChanged, param} = props
  const onChanged = onChangedElementInRecord(onQueryParamChanged, param)

  const inputFor = (prop: keyof QueryParam) => <input type="text"
                                                   data-testid={prop}
                                                   onChange={onChanged(prop)}
                                                   value={param[prop]}/>
  return <article>
    {inputFor('key')}
    {inputFor('value')}
    {inputFor('description')}
  </article>
}
type Props = Readonly<{
  queryParams: QueryParam[]
  onQueryParamsChanged: (p: QueryParam[]) => void
}>

export const QueryParamsForm = (props: Props) => {
  const {queryParams, onQueryParamsChanged} = props

  const onQueryParamChanged = (queryParam: QueryParam, index: number) => {
    const newParams = replaceAt(queryParams, queryParam, index)
    onQueryParamsChanged(newParams)
  }

  const onAddPressed = () => {
    onQueryParamsChanged([...queryParams, defaultQueryParam()])
  }

  const paramForms = queryParams.map((q, index) =>
    <ParamForm key={index}
               param={q}
               onQueryParamChanged={(p) => onQueryParamChanged(p, index)}
    />)

  return (
    <section data-testid="query params">
      {paramForms}
      <button data-testid="query params add button" onClick={onAddPressed}>Add query parameter</button>
    </section>
  )
}