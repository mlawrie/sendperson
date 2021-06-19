import React, {Fragment} from 'react'
import {defaultParam, RequestParam} from 'domain/Request'
import {assignTo, curry3, eventChecked, eventValue, removeAt, replaceAt, withDefaults} from 'utility/utilities'
import {pipe} from 'ramda'
import styles from './ParamsForm.scss'

const ParamForm = (props: Readonly<{ param: RequestParam, onParamChanged: (p: RequestParam) => void, index: number, entityId: string }>) => {
  const {onParamChanged, param, index, entityId} = props
  const firstRow = index == 0

  const onChanged = pipe(withDefaults(param), onParamChanged)


  const inputFor = (prop: keyof RequestParam) => {
    const id = `${entityId}-${prop}-${index}`
    const label = firstRow ? <label htmlFor={id}>{prop}</label> : <Fragment/>
    return (<div className="form-group">
      {label}
      <input type="text"
             className="form-control form-control-sm"
             data-testid={prop}
             id={`${entityId}-${prop}-${index}`}
             onChange={pipe(eventValue, assignTo<RequestParam>(prop), onChanged)}
             value={param[prop] as any}/>
    </div>)

  }

  return <Fragment>
    <div className={styles.checkboxContainer}>
      <div className="form-check">
        <input type="checkbox"
               className="form-check-input"
               checked={param.enabled}
               data-testid="enabled"
               onChange={pipe(eventChecked, assignTo<RequestParam>('enabled'), onChanged)}/>
      </div>
    </div>
    <div className={styles.inputContainer}>

      {inputFor('key')}
      {inputFor('value')}
      {inputFor('description')}

    </div>
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
    <article key={index} className={styles.formRow}>
      <ParamForm
        index={index}
        entityId={(entityName || '').replace(' ', '_')}
        param={q}
        onParamChanged={onParamChanged(index)}/>
      <div className={styles.buttonContainer}>
        <button data-testid="delete param"
                className={`btn btn-secondary btn-sm`}
                onClick={onDeletePressed(index) as any}>Delete
        </button>
      </div>
    </article>)

  return (
    <section data-testid={entityName} className={styles.container}>
      <h6>{entityNamePluralCapitalized}</h6>
      {paramForms}
      <button data-testid="params add button" className="btn btn-primary btn-sm"
              onClick={onAddPressed}>Add {entityName}</button>
    </section>
  )
}