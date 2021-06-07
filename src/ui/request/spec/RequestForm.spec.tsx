import {fireEvent, render, screen} from '@testing-library/react'
import {RequestForm} from 'ui/request/RequestForm'
import {expect, sandbox, updateInput} from 'utility/spec/specHelper'
import {defaultRequest, Request} from 'domain/Request'
import React from 'react'
import Sinon from 'sinon'

describe('RequestForm', () => {
  let onChangeRequested: Sinon.SinonStub, onSendPressed: Sinon.SinonStub, request: Request

  beforeEach(() => {
    onChangeRequested = sandbox().stub()
    request = defaultRequest()
    onSendPressed = sandbox().stub()
    render(<RequestForm onRequestChanged={onChangeRequested} request={request} onSendPressed={onSendPressed}/>)
  })

  it('updates parent when uri changes', async () => {
    const inputEl = await screen.findByTestId('uri input')
    updateInput(inputEl, 'https://example.com')

    expect(onChangeRequested).to.have.been.calledWith({...defaultRequest(), uri: 'https://example.com'})
  })

  it('updates parent when method changes', async () => {
    const inputEl = await screen.findByTestId('method input')
    updateInput(inputEl, 'POST')

    expect(onChangeRequested).to.have.been.calledWith({...defaultRequest(), method: 'POST'})
  })

  it('updates parent when send pressed', async () => {
    const button = await screen.findByTestId('send button')
    fireEvent.click(button)

    expect(onSendPressed).to.have.been.called
  })

})