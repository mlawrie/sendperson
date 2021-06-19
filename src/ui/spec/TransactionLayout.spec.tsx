import {getByText, render, screen} from '@testing-library/react'
import {TransactionsContext, transactionsContextInstance} from 'domain/TransactionsContext'
import * as React from 'react'
import {TransactionLayout} from 'ui/TransactionLayout'
import {defaultTransaction} from 'domain/Transaction'

describe('TransactionLayout', () => {
  it('renders a transaction request UI', async () => {
    const transaction = {...defaultTransaction(), uuid: 'foo'}
    const context: Partial<TransactionsContext> = {
      transactions: [transaction],
      highlightedUuid: transaction.uuid,
      visibleUuids: [transaction.uuid]
    }

    render(<transactionsContextInstance.Provider value={context as TransactionsContext}>
      <TransactionLayout/>
    </transactionsContextInstance.Provider>)

    const methodInput = await screen.queryAllByTestId('method input')
    const uriInput = await screen.queryAllByTestId('uri input')

    expect(uriInput).toHaveLength(1)
    expect(methodInput).toHaveLength(1)
  })

  it('renders a message when there are no transactions visible', async () => {
    const context: Partial<TransactionsContext> = {
      transactions: [defaultTransaction()],
      visibleUuids: []
    }

    render(<transactionsContextInstance.Provider value={context as TransactionsContext}>
      <TransactionLayout/>
    </transactionsContextInstance.Provider>)

    const uriInput = await screen.queryAllByTestId('uri input')

    expect(uriInput).toHaveLength(0)

    const text = await screen.queryAllByText('Click the plus icon in the menu bar to get started')
    expect(text).toHaveLength(1)
  })
})