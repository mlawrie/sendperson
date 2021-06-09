import {fireEvent, render, screen} from '@testing-library/react'
import {expect, sandbox, updateInput} from 'utility/spec/specHelper'
import {defaultQueryParam} from 'domain/Request'
import React from 'react'
import Sinon from 'sinon'
import {QueryParamsForm} from 'ui/request/QueryParamsForm'

describe('QueryParamsForm', () => {
  let onQueryParamsChanged: Sinon.SinonStub, onSendPressed: Sinon.SinonStub

  beforeEach(() => {
    onQueryParamsChanged = sandbox().stub()
    onSendPressed = sandbox().stub()
  })

  it('adds a query param', async () => {
    render(<QueryParamsForm onQueryParamsChanged={onQueryParamsChanged} queryParams={[]}/>)
    const addButton = await screen.findByTestId('query params add button')
    fireEvent.click(addButton)
    expect(onQueryParamsChanged).to.have.been.calledWith([defaultQueryParam()])
  })

  it('deletes a query param', async () => {
    render(<QueryParamsForm onQueryParamsChanged={onQueryParamsChanged} queryParams={[defaultQueryParam()]}/>)
    const addButton = await screen.findByTestId('delete query param')
    fireEvent.click(addButton)
    expect(onQueryParamsChanged).to.have.been.calledWith([])
  })

  it('displays initial key and updates parent when key changes', async () => {
    render(<QueryParamsForm onQueryParamsChanged={onQueryParamsChanged}
                            queryParams={[{...defaultQueryParam(), key: 'foo'}]}/>)
    const keyElement = await screen.findByTestId('key') as HTMLInputElement

    expect(keyElement.value).to.eql('foo')

    updateInput(keyElement, 'new key')

    expect(onQueryParamsChanged).to.be.calledWith([{...defaultQueryParam(), key: 'new key'}])
  })

  it('displays initial value and updates parent when value changes', async () => {
    render(<QueryParamsForm onQueryParamsChanged={onQueryParamsChanged}
                            queryParams={[{...defaultQueryParam(), value: 'foo'}]}/>)
    const valueElement = await screen.findByTestId('value') as HTMLInputElement

    expect(valueElement.value).to.eql('foo')

    updateInput(valueElement, 'new value')

    expect(onQueryParamsChanged).to.be.calledWith([{...defaultQueryParam(), value: 'new value'}])
  })

  it('displays initial description and updates parent when description changes', async () => {
    render(<QueryParamsForm onQueryParamsChanged={onQueryParamsChanged}
                            queryParams={[{...defaultQueryParam(), description: 'foo'}]}/>)
    const descriptionElement = await screen.findByTestId('description') as HTMLInputElement

    expect(descriptionElement.value).to.eql('foo')

    updateInput(descriptionElement, 'new description')

    expect(onQueryParamsChanged).to.be.calledWith([{...defaultQueryParam(), description: 'new description'}])
  })

  it('displays whether initially enabled and updates parent when enabled-ness changes', async () => {
    render(<QueryParamsForm onQueryParamsChanged={onQueryParamsChanged}
                            queryParams={[{...defaultQueryParam()}]}/>)
    const enabledCheckbox = await screen.findByTestId('enabled') as HTMLInputElement

    expect(enabledCheckbox.checked).to.eql(true)

    fireEvent.click(enabledCheckbox)

    expect(onQueryParamsChanged).to.be.calledWith([{...defaultQueryParam(), enabled: false}])
  })
})

