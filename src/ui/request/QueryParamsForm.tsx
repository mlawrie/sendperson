import React, {Fragment} from 'react'
import {defaultQueryParam, QueryParam} from 'domain/Request'
import {assignTo, curry2, curry3, eventChecked, eventValue, removeAt, replaceAt, withDefaults} from 'utility/utilities'
import {flip, pipe} from 'ramda'

const ParamForm = (props: Readonly<{ param: QueryParam, onQueryParamChanged: (p: QueryParam) => void }>) => {
  const {onQueryParamChanged, param} = props
  const onChanged = pipe(withDefaults(param), onQueryParamChanged)

  const inputFor = (prop: keyof QueryParam) => (
    <input type="text"
           data-testid={prop}
           onChange={pipe(eventValue, assignTo<QueryParam>(prop), onChanged)}
           value={param[prop] as any}/>
  )

  return <Fragment>
    <input type="checkbox"
           checked={param.enabled}
           data-testid="enabled"
           onChange={pipe(eventChecked, assignTo<QueryParam>('enabled'), onChanged)}/>
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

  const replaceQueryParamAtIndex = curry3(replaceAt)(queryParams)

  const onQueryParamChanged = (index: number) => pipe(replaceQueryParamAtIndex(index), onQueryParamsChanged)

  const onDeletePressed = (index: number) => () => {
    onQueryParamsChanged(removeAt(queryParams, index))
  }

  const onAddPressed = () => {
    onQueryParamsChanged([...queryParams, defaultQueryParam()])
  }

  const paramForms = queryParams.map((q, index) =>
    <article key={index}>
      <ParamForm
        param={q}
        onQueryParamChanged={onQueryParamChanged(index)}/>
      <button data-testid="delete query param" onClick={onDeletePressed(index) as any}>Delete</button>
    </article>)

  return (
    <section data-testid="query params">
      {paramForms}
      <button data-testid="query params add button" onClick={onAddPressed}>Add query parameter</button>
    </section>
  )
}