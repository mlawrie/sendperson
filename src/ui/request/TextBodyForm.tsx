import React, {Fragment} from 'react'
import MonacoEditor from 'react-monaco-editor'


export const TextBodyForm = (props: Readonly<{ onTextChanged: (a: string) => void, text: string }>) => {
  const {text, onTextChanged} = props
  return <Fragment>
    <MonacoEditor
      width="800"
      height="600"
      language="javascript"
      theme="vs-light"
      value={text}
      onChange={onTextChanged}
    />
  </Fragment>
}
