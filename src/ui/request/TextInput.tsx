import {pipe} from 'ramda'
import {eventValue} from 'utility/utilities'
import React, {Fragment} from 'react'

const TextInput = (props: Readonly<{ onChange: (value: string) => void, value: string, label?: string, testId?: string }>) => {
  const {onChange, value, label, testId} = props

  return <label>
    {label ? <span>{label}</span> : <Fragment/>}
    <input type="text"
           data-testid={testId}
           onChange={pipe(eventValue, onChange)}
           value={value}/>
  </label>
}
