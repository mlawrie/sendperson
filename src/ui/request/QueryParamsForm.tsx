import React from 'react'
import {defaultQueryParam, QueryParam} from 'domain/Request'
import {replaceAt} from 'utility/replaceAt'

const ParamForm = (props: Readonly<{ param: QueryParam, onQueryParamChanged: (p: QueryParam) => void }>) => {
  const {key, value, description} = props.param

  const update = (prop: keyof QueryParam, e: React.ChangeEvent<HTMLInputElement>) => {
    const newVar = {...props.param, [prop]: e.target.value}
    props.onQueryParamChanged(newVar)
  }

  return <article>
    <input type="text"
           data-testid="key"
           onChange={(e) => update('key', e)}
           value={key}/>
    <input type="text"
           data-testid="value"
           onChange={(e) => update('value', e)}
           value={value}/>
    <input type="text"
           data-testid="description"
           onChange={(e) => update('description', e)}
           value={description}/>
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
    <ParamForm key={q.key}
               param={q}
               onQueryParamChanged={(p) => onQueryParamChanged(p, index)}
    />)

  return (
    <section data-testid="query params">
      {paramForms}
      <button data-testid="add button" onClick={onAddPressed}>Add query parameter</button>
    </section>
  )
}