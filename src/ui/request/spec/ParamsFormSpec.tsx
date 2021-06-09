import {fireEvent, render, screen} from '@testing-library/react'
import {expect, sandbox, updateInput} from 'utility/spec/specHelper'
import {defaultParam} from 'domain/Request'
import React from 'react'
import Sinon from 'sinon'
import {ParamsForm} from 'ui/request/ParamsForm'

describe('ParamsForm', () => {
  let onQueryParamsChanged: Sinon.SinonStub, onSendPressed: Sinon.SinonStub

  beforeEach(() => {
    onQueryParamsChanged = sandbox().stub()
    onSendPressed = sandbox().stub()
  })

  it('adds a param', async () => {
    render(<ParamsForm onParamsChanged={onQueryParamsChanged} params={[]}/>)
    const addButton = await screen.findByTestId('params add button')
    fireEvent.click(addButton)
    expect(onQueryParamsChanged).to.have.been.calledWith([defaultParam()])
  })

  it('deletes a param', async () => {
    render(<ParamsForm onParamsChanged={onQueryParamsChanged} params={[defaultParam()]}/>)
    const addButton = await screen.findByTestId('delete param')
    fireEvent.click(addButton)
    expect(onQueryParamsChanged).to.have.been.calledWith([])
  })

  it('displays initial key and updates parent when key changes', async () => {
    render(<ParamsForm onParamsChanged={onQueryParamsChanged}
                       params={[{...defaultParam(), key: 'foo'}]}/>)
    const keyElement = await screen.findByTestId('key') as HTMLInputElement

    expect(keyElement.value).to.eql('foo')

    updateInput(keyElement, 'new key')

    expect(onQueryParamsChanged).to.be.calledWith([{...defaultParam(), key: 'new key'}])
  })

  it('displays initial value and updates parent when value changes', async () => {
    render(<ParamsForm onParamsChanged={onQueryParamsChanged}
                       params={[{...defaultParam(), value: 'foo'}]}/>)
    const valueElement = await screen.findByTestId('value') as HTMLInputElement

    expect(valueElement.value).to.eql('foo')

    updateInput(valueElement, 'new value')

    expect(onQueryParamsChanged).to.be.calledWith([{...defaultParam(), value: 'new value'}])
  })

  it('displays initial description and updates parent when description changes', async () => {
    render(<ParamsForm onParamsChanged={onQueryParamsChanged}
                       params={[{...defaultParam(), description: 'foo'}]}/>)
    const descriptionElement = await screen.findByTestId('description') as HTMLInputElement

    expect(descriptionElement.value).to.eql('foo')

    updateInput(descriptionElement, 'new description')

    expect(onQueryParamsChanged).to.be.calledWith([{...defaultParam(), description: 'new description'}])
  })

  it('displays whether initially enabled and updates parent when enabled-ness changes', async () => {
    render(<ParamsForm onParamsChanged={onQueryParamsChanged}
                       params={[{...defaultParam()}]}/>)
    const enabledCheckbox = await screen.findByTestId('enabled') as HTMLInputElement

    expect(enabledCheckbox.checked).to.eql(true)

    fireEvent.click(enabledCheckbox)

    expect(onQueryParamsChanged).to.be.calledWith([{...defaultParam(), enabled: false}])
  })
})

