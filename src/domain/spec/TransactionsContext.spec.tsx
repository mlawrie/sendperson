import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'
import {TransactionsContextConsumer, TransactionsContextProvider} from 'domain/TransactionsContext'
import {defaultTransaction} from 'domain/Transaction'

describe('TransactionsContext', () => {
  let document: HTMLElement
  beforeEach(() => {
    const transactionToSave = defaultTransaction()
    const {container} = render(<TransactionsContextProvider>
      <TransactionsContextConsumer>
        {value => <div data-testid='button'
                       onClick={() => value.saveTransaction(transactionToSave)}>
          count: {value.transactions.length}
        </div>}
      </TransactionsContextConsumer>
    </TransactionsContextProvider>)

    document = container
  })

  it('saves a new transaction', async () => {
    expect(document.textContent).toEqual('count: 0')
    fireEvent.click(await screen.findByTestId('button'))
    expect(document.textContent).toEqual('count: 1')
  })

  it('replaces an existing transaction', async () => {
    fireEvent.click(await screen.findByTestId('button'))
    fireEvent.click(await screen.findByTestId('button'))
    expect(document.textContent).toEqual('count: 1')
  })
})