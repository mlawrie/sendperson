import React, {Fragment} from 'react'
import {defaultParam, RequestParam} from 'domain/Request'
import {assignTo, curry3, eventChecked, eventValue, removeAt, replaceAt, withDefaults} from 'utility/utilities'
import {pipe} from 'ramda'
import styles from './ParamsForm.scss'

const ParamForm = (props: Readonly<{ param: RequestParam, onParamChanged: (p: RequestParam) => void, firstRow: boolean }>) => {
  const {onParamChanged, param, firstRow} = props
  const onChanged = pipe(withDefaults(param), onParamChanged)

  const inputFor = (prop: keyof RequestParam) => (
    <input type="text"
           className={`${styles.input} ${firstRow ? styles.firstRow : ''}`}
           data-testid={prop}
           onChange={pipe(eventValue, assignTo<RequestParam>(prop), onChanged)}
           value={param[prop] as any}/>
  )

  return <Fragment>
    <input type="checkbox"
           checked={param.enabled}
           data-testid="enabled"
           onChange={pipe(eventChecked, assignTo<RequestParam>('enabled'), onChanged)}/>
    {inputFor('key')}
    {inputFor('value')}
    {inputFor('description')}
  </Fragment>
}

type Props = Readonly<{
  params: RequestParam[]
  onParamsChanged: (p: RequestParam[]) => void
  entityName?: 'query param' | 'header' | 'form field'
  entityNamePluralCapitalized?: 'Query Params' | 'Headers' | 'Form Fields'
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
        firstRow={index === 0}
        param={q}
        onParamChanged={onParamChanged(index)}/>
      <button data-testid="delete param" onClick={onDeletePressed(index) as any}>Delete</button>
    </article>)

  return (
    <section data-testid={entityName} className={styles.container}>
      <h6>{entityNamePluralCapitalized}</h6>
      {paramForms}
      <button data-testid="params add button" onClick={onAddPressed}>Add {entityName}</button>
    </section>
  )
}