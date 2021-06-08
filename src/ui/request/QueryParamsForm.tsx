import React, {Fragment} from 'react'
import {defaultQueryParam, QueryParam} from 'domain/Request'
import {removeAt, replaceAt} from 'utility/arrayUtilities'
import {onChangedElementInRecord} from 'utility/onChangedElementInRecord'

const ParamForm = (props: Readonly<{ param: QueryParam, onQueryParamChanged: (p: QueryParam) => void }>) => {
  const {onQueryParamChanged, param} = props
  const onChanged = onChangedElementInRecord(onQueryParamChanged, param)

  const inputFor = (prop: keyof QueryParam) => <input type="text"
                                                      data-testid={prop}
                                                      onChange={onChanged(prop)}
                                                      value={param[prop]}/>
  return <Fragment>
    {inputFor('key')}
    {inputFor('value')}
    {inputFor('description')}
  </Fragment>
}
type Props = Readonly<{
  queryParams: QueryParam[]
  onQueryParamsChanged: (p: QueryParam[]) => void
}>

export const QueryParamsForm = (props: Props) => {
  const {queryParams, onQueryParamsChanged} = props

  const onQueryParamChanged = (queryParam: QueryParam, index: number) => {
    onQueryParamsChanged(replaceAt(queryParams, queryParam, index))
  }

  const onAddPressed = () => {
    onQueryParamsChanged([...queryParams, defaultQueryParam()])
  }

  const onDeletePressed = (index: number) => () => {
    onQueryParamsChanged(removeAt(queryParams, index))
  }

  const paramForms = queryParams.map((q, index) =>
    <article key={index}>
      <ParamForm
                 param={q}
                 onQueryParamChanged={(p) => onQueryParamChanged(p, index)}/>
      <button data-testid="delete query param" onClick={onDeletePressed(index)}>Delete</button>
    </article>)

  return (
    <section data-testid="query params">
      {paramForms}
      <button data-testid="query params add button" onClick={onAddPressed}>Add query parameter</button>
    </section>
  )
}