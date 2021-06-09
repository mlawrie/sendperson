import React, {Fragment} from 'react'
import {defaultParam, Param} from 'domain/Request'
import {assignTo, curry2, curry3, eventChecked, eventValue, removeAt, replaceAt, withDefaults} from 'utility/utilities'
import {flip, pipe} from 'ramda'

const ParamForm = (props: Readonly<{ param: Param, onParamChanged: (p: Param) => void }>) => {
  const {onParamChanged, param} = props
  const onChanged = pipe(withDefaults(param), onParamChanged)

  const inputFor = (prop: keyof Param) => (
    <input type="text"
           data-testid={prop}
           onChange={pipe(eventValue, assignTo<Param>(prop), onChanged)}
           value={param[prop] as any}/>
  )

  return <Fragment>
    <input type="checkbox"
           checked={param.enabled}
           data-testid="enabled"
           onChange={pipe(eventChecked, assignTo<Param>('enabled'), onChanged)}/>
    {inputFor('key')}
    {inputFor('value')}
    {inputFor('description')}
  </Fragment>
}

type Props = Readonly<{
  params: Param[]
  onParamsChanged: (p: Param[]) => void
  entityName?: 'query param' | 'header'
  entityNamePluralCapitalized?: 'Query Params' | 'Headers'
}>

export const ParamsForm = (props: Props) => {
  const {params, onParamsChanged, entityName, entityNamePluralCapitalized} = props

  const replaceParamAtIndex = curry3(replaceAt)(params)

  const onParamChanged = (index: number) => pipe(replaceParamAtIndex(index), onParamsChanged)

  const onDeletePressed = (index: number) => () => {
    onParamsChanged(removeAt(params, index))
  }

  const onAddPressed = () => {
    onParamsChanged([...params, defaultParam()])
  }

  const paramForms = params.map((q, index) =>
    <article key={index}>
      <ParamForm
        param={q}
        onParamChanged={onParamChanged(index)}/>
      <button data-testid="delete param" onClick={onDeletePressed(index) as any}>Delete</button>
    </article>)

  return (
    <section data-testid={entityName}>
      <h3>{entityNamePluralCapitalized}</h3>
      {paramForms}
      <button data-testid="params add button" onClick={onAddPressed}>Add {entityName}</button>
    </section>
  )
}