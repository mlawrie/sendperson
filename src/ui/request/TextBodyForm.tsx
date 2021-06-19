import React from 'react'
import MonacoEditor from 'react-monaco-editor'
import {EditorDidMount} from 'react-monaco-editor/src/types'
import {BodyFormat} from 'domain/Request'
import styles from './TextBodyForm.scss'

let ignoreEvent = false
const updateHeight: EditorDidMount = (editor, monaco) => {
  if (ignoreEvent) {
    return
  }
  const container = editor.getDomNode().parentElement.parentElement
  const contentHeight = Math.max(editor.getContentHeight(), 500)

  container.style.height = `${contentHeight}px`
  const width = container.clientWidth

  try {
    ignoreEvent = true
    editor.layout({width, height: contentHeight})
  } finally {
    ignoreEvent = false
  }
}

const editorDidMount: EditorDidMount = (editor, monaco) => {
  editor.onDidContentSizeChange(() => updateHeight(editor, monaco))

  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true
  })

  updateHeight(editor, monaco)

}

const LANGUAGES = {
  'text/plain': 'plaintext',
  'text/html': 'html',
  'text/xml': 'xml',
  'application/json': 'json'
}

export const TextBodyForm = (props: Readonly<{ onTextChanged: (a: string) => void, text: string, format: BodyFormat }>) => {
  const {text, onTextChanged} = props
  const language = (LANGUAGES as any)[props.format]

  return <div className={styles.container}>
    <MonacoEditor
      options={{
        renderValidationDecorations: 'on',
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        wrappingStrategy: 'advanced',
        scrollbar: {
          vertical: 'hidden',
          handleMouseWheel: false
        },
        minimap: {
          enabled: false
        },
        overviewRulerLanes: 0
      }}
      language={language}
      theme="vs-light"
      width="100%"
      value={text}
      editorDidMount={editorDidMount}
      onChange={onTextChanged}
    />
  </div>
}
