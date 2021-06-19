import {render, screen} from '@testing-library/react'
import React, {Fragment} from 'react'
import {TransactionsContextConsumer, TransactionsContextProvider} from 'domain/TransactionsContext'
import {defaultTransaction, Transaction} from 'domain/Transaction'
import {defaultRequest} from 'domain/Request'

describe('TransactionsContext', () => {
  const setup = async (textToRender: (transactions: Transaction[]) => string) => {
    const {container} = render(<TransactionsContextProvider>
      <TransactionsContextConsumer>
        {value => <Fragment>

          <div data-testid="save button"
               onClick={(e) => value.saveTransaction(e.detail as any)}>

          </div>
          <div data-testid="update button"
               onClick={(e) => {
                 const data = e.detail as any
                 value.updateTransaction(data.uuid, data.transaction)
               }}>
          </div>
          {textToRender(value.transactions)}
        </Fragment>}
      </TransactionsContextConsumer>
    </TransactionsContextProvider>)

    return {container}
  }

  const dispatchEvent = async (data: any, testId: string) => {
    const button = await screen.findByTestId(testId)

    const event = document.createEvent('Events')
    event.initEvent('click', true, false)
    const eventAny = (event as any)
    eventAny.detail = data

    button.dispatchEvent(event)
  }


  it('saves a new transaction', async () => {
    const {container} = await setup((t) => `count: ${t.length}`)
    expect(container.textContent).toEqual('count: 1')
    await dispatchEvent(defaultTransaction(), 'save button')
    expect(container.textContent).toEqual('count: 2')
  })

  it('replaces an existing transaction', async () => {
    const {container} = await setup((t) => `count: ${t.length}`)

    expect(container.textContent).toEqual('count: 1')

    const transaction = defaultTransaction()
    await dispatchEvent(transaction, 'save button')
    await dispatchEvent(transaction, 'save button')

    expect(container.textContent).toEqual('count: 2')
  })

  it('updates the request portion of an existing transaction', async () => {
    const getUris = (transactions: Transaction[]) => transactions.map(t => t.request.uri)
    const {container} = await setup((t) => `uris: ${JSON.stringify(getUris(t))}`)
    const transaction = {...defaultTransaction(), request: {...defaultRequest(), uri: 'https://example.com'}}

    await dispatchEvent(transaction, 'save button')
    expect(container.textContent).toEqual('uris: ["","https://example.com"]')

    const update = {uuid: transaction.uuid, transaction: {request: {...transaction.request, uri: 'https://example.com/foo'}}}

    await dispatchEvent(update, 'update button')
    expect(container.textContent).toEqual('uris: ["","https://example.com/foo"]')
  })
})