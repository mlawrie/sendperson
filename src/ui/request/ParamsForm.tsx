import React, {Fragment} from 'react'
import {defaultParam, RequestParam} from 'domain/Request'
import {assignTo, curry2, curry3, eventChecked, eventValue, removeAt, replaceAt, withDefaults} from 'utility/utilities'
import {flip, pipe} from 'ramda'
import styled from 'styled-components'
import {layout} from 'utility/constants'


const H3 = styled.h3`
    ${layout.font.smallTitle}
  `

const Input = styled.input`
  border: 1px solid ${layout.darkGrey};
  ${layout.lineHeight}
  &:nth-of-type(3n) {
    border-left: none;
    border-radius: 0px;
    border-right: none;
  }
  &:nth-of-type(3n+1) {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  &:nth-of-type(3n-1) {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
`

const ParamForm = (props: Readonly<{ param: RequestParam, onParamChanged: (p: RequestParam) => void }>) => {
  const {onParamChanged, param} = props
  const onChanged = pipe(withDefaults(param), onParamChanged)

  const inputFor = (prop: keyof RequestParam) => (
    <Input type="text"
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
        param={q}
        onParamChanged={onParamChanged(index)}/>
      <button data-testid="delete param" onClick={onDeletePressed(index) as any}>Delete</button>
    </article>)

  return (
    <section data-testid={entityName}>
      <H3>{entityNamePluralCapitalized}</H3>
      {paramForms}
      <button data-testid="params add button" onClick={onAddPressed}>Add {entityName}</button>
    </section>
  )
}