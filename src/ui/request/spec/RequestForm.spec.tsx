import {findByTestId, fireEvent, getByTestId, render, screen} from '@testing-library/react'
import {RequestForm} from 'ui/request/RequestForm'
import {expect, sandbox, updateInput} from 'utility/spec/specHelper'
import {defaultParam, defaultRequest, Param, Request} from 'domain/Request'
import React from 'react'
import Sinon from 'sinon'

describe('RequestForm', () => {
  let onRequestChanged: Sinon.SinonStub, onSendPressed: Sinon.SinonStub, request: Request
  const queryParam: Param = {
    ...defaultParam(),
    description: 'desc', key: 'key key', value: 'valuee'
  }

  const header: Param = {
    ...defaultParam(),
    description: 'header desc', key: 'X-Correlation-Id', value: '1234'
  }

  beforeEach(() => {
    onRequestChanged = sandbox().stub()
    request = {
      ...defaultRequest(),
      uri: 'https://foo.com',
      method: 'PATCH',
      queryParams: [queryParam],
      headers: [header]
    }
    onSendPressed = sandbox().stub()
    render(<RequestForm onRequestChanged={onRequestChanged} request={request} onSendPressed={onSendPressed}/>)
  })

  it('displays initial uri and updates parent when uri changes', async () => {
    const inputEl = await screen.findByTestId('uri input') as HTMLInputElement

    expect(inputEl.value).to.eql('https://foo.com')

    updateInput(inputEl, 'https://example.com')

    expect(onRequestChanged).to.have.been.calledWith({...request, uri: 'https://example.com'})
  })

  it('displays initial method and updates parent when method changes', async () => {
    const inputEl = await screen.findByTestId('method input') as HTMLInputElement

    expect(inputEl.value).to.eql('PATCH')

    updateInput(inputEl, 'POST')

    expect(onRequestChanged).to.have.been.calledWith({...request, method: 'POST'})
  })

  it('updates parent when send pressed', async () => {
    const button = await screen.findByTestId('send button')
    fireEvent.click(button)

    expect(onSendPressed).to.have.been.called
  })

  it('displays initial query params', async () => {
    const queryForm = await screen.findByTestId('query param')
    const keyEl = await getByTestId(queryForm, 'key') as HTMLInputElement
    expect(keyEl.value).to.eql('key key')
  })

  it('updates parent when query params change', async () => {
    const queryForm = await screen.findByTestId('query param')
    const addButton = await findByTestId(queryForm, 'params add button')
    fireEvent.click(addButton)
    expect(onRequestChanged).to.be.called
    expect(onRequestChanged.lastCall.firstArg.queryParams).to.eql([queryParam, defaultParam()])
  })

  it('displays initial headers', async () => {
    const headerForm = await screen.findByTestId('header')
    const keyEl = await getByTestId(headerForm, 'key') as HTMLInputElement
    expect(keyEl.value).to.eql('X-Correlation-Id')
  })

  it('updates parent when headers change', async () => {
    const headerForm = await screen.findByTestId('header')
    const addButton = await findByTestId(headerForm, 'params add button')
    fireEvent.click(addButton)
    expect(onRequestChanged).to.be.called
    expect(onRequestChanged.lastCall.firstArg.headers).to.eql([header, defaultParam()])
  })
})