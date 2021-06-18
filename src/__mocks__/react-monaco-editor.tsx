import {pipe} from 'ramda'
import React from 'react'
import {eventValue} from 'utility/utilities'

const MonacoEditor = (props: { value: string, onChange: (value: string) => void }) => {
  return <textarea
    data-testid='request body text'
    value={props.value}
    onChange={pipe(eventValue, props.onChange)}
  />
}

export default MonacoEditor