import {fireEvent, render, screen} from '@testing-library/react'
import {RequestForm} from 'ui/request/RequestForm'
import {expect, sandbox, updateInput} from 'utility/spec/specHelper'
import {defaultRequest, QueryParam, Request} from 'domain/Request'
import React from 'react'
import Sinon from 'sinon'

describe('RequestForm', () => {
  let onChangeRequested: Sinon.SinonStub, onSendPressed: Sinon.SinonStub, request: Request
  const queryParam: QueryParam = {
    description: 'desc', key: 'key key', value: 'valuee'
  }

  beforeEach(() => {
    onChangeRequested = sandbox().stub()
    request = {...defaultRequest(), uri: 'https://foo.com', method: 'PATCH', queryParams: [queryParam]}
    onSendPressed = sandbox().stub()
    render(<RequestForm onRequestChanged={onChangeRequested} request={request} onSendPressed={onSendPressed}/>)
  })

  it('displays initial uri and updates parent when uri changes', async () => {
    const inputEl = await screen.findByTestId('uri input') as HTMLInputElement

    expect(inputEl.value).to.eql('https://foo.com')

    updateInput(inputEl, 'https://example.com')

    expect(onChangeRequested).to.have.been.calledWith({...request, uri: 'https://example.com'})
  })

  it('displays initial method and updates parent when method changes', async () => {
    const inputEl = await screen.findByTestId('method input') as HTMLInputElement

    expect(inputEl.value).to.eql('PATCH')

    updateInput(inputEl, 'POST')

    expect(onChangeRequested).to.have.been.calledWith({...request, method: 'POST'})
  })

  it('updates parent when send pressed', async () => {
    const button = await screen.findByTestId('send button')
    fireEvent.click(button)

    expect(onSendPressed).to.have.been.called
  })

  it('diplays initial query params', async () => {
    const element = await screen.findByTestId('query params')
    expect(element.textContent).to.contain('key key valuee desc')

  })
})