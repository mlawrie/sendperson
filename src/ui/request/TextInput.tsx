import styled from 'styled-components'
import {layout} from 'utility/constants'
import {pipe} from 'ramda'
import {eventValue} from 'utility/utilities'
import React, {Fragment} from 'react'

const Input = styled.input`
  border: 1px solid ${layout.darkGrey};
  margin: 10px 10px 10px 0;
  ${layout.lineHeight}
`

const Label = styled.label`
  
`

const Span = styled.span`
  display: block;
  ${layout.font.smallTitle}
  margin: 0 0 15px 0;
`

const TextInput = (props: Readonly<{ onChange: (value: string) => void, value: string, label?: string, testId?: string }>) => {
  const {onChange, value, label, testId} = props

  return <Label>
    {label ? <Span>{label}</Span> : <Fragment/>}
    <Input type="text"
           data-testid={testId}
           onChange={pipe(eventValue, onChange)}
           value={value}/>
  </Label>
}
