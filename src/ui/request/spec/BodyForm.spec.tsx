import {findByTestId, fireEvent, getByTestId, render, screen} from '@testing-library/react'
import {expect, sandbox, updateInput} from 'utility/spec/specHelper'
import {defaultParam, RequestBody, RequestParam} from 'domain/Request'
import React from 'react'
import Sinon from 'sinon'
import {BodyForm} from 'ui/request/BodyForm'

describe('BodyForm', () => {
  let onBodyChanged: Sinon.SinonStub, body: RequestBody

  const formField: RequestParam = {
    ...defaultParam(),
    description: 'form data username', key: 'username', value: 'abc123'
  }

  const setup = (partialBody: Partial<RequestBody>) => {
    onBodyChanged = sandbox().stub()
    body = {...{
      text: 'body text',
      format: 'text/plain',
      fields: [formField]
    }, ...partialBody}

    render(<BodyForm onBodyChanged={onBodyChanged} body={body}/>)
  }

  it('displays initial body text and updates parent when body text changes', async () => {
    setup({})
    const inputEl = await screen.findByTestId('request body text') as HTMLTextAreaElement

    expect(inputEl.value).to.eql('body text')

    updateInput(inputEl,'new body text')

    expect(onBodyChanged).to.have.been.calledWith({...body, text: 'new body text'})
  })

  it('displays initial format and updates parent when format changes', async () => {
    setup({})
    const inputEl = await screen.findByTestId('format input') as HTMLTextAreaElement

    expect(inputEl.value).to.eql('text/plain')

    updateInput(inputEl,'multipart/form-data')

    expect(onBodyChanged).to.have.been.calledWith({...body, format: 'multipart/form-data'})
  })

  it('displays initial form fields', async () => {
    setup({format: 'multipart/form-data'})
    const formFieldForm = await screen.findByTestId('form field')
    const keyEl = await getByTestId(formFieldForm, 'key') as HTMLInputElement
    expect(keyEl.value).to.eql('username')
  })

  it('updates parent when form fields change', async () => {
    setup({format: 'multipart/form-data'})
    const formFieldForm = await screen.findByTestId('form field')
    const addButton = await findByTestId(formFieldForm, 'params add button')
    fireEvent.click(addButton)
    expect(onBodyChanged).to.be.called
    expect(onBodyChanged.lastCall.firstArg.fields).to.eql([formField, defaultParam()])
  })
})