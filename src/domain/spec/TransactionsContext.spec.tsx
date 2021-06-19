import React from 'react'
import {TransactionsContext, TransactionsContextConsumer, TransactionsContextProvider} from 'domain/TransactionsContext'
import {defaultTransaction, Transaction} from 'domain/Transaction'
import {renderGetContext, TestContextRenderFunction} from 'utility/spec/specHelper'
import {act} from '@testing-library/react'
import {defaultRequest} from 'domain/Request'

describe('TransactionsContext', () => {
  const renderTestSetup: TestContextRenderFunction<TransactionsContext> = (testContents) =>
    <TransactionsContextProvider>
      <TransactionsContextConsumer>
        {testContents}
      </TransactionsContextConsumer>
    </TransactionsContextProvider>

  it('saves a new transaction', () => {
    const context = renderGetContext(renderTestSetup)

    expect(context().transactions.length).toEqual(1)

    act(() => {
      context().saveTransaction(defaultTransaction())
    })

    expect(context().transactions.length).toEqual(2)
  })

  it('sets new transaction as highlighted', async () => {
    const context = renderGetContext(renderTestSetup)
    expect(context().transactions.length).toEqual(1)

    act(() => {
      const saved = {...defaultTransaction(), uuid: 'foo123'}
      context().saveTransaction(saved)
    })

    expect(context().highlightedUuid).toEqual('foo123')
  })

  it('adds new transaction to visible list if not already present', () => {
    const context = renderGetContext(renderTestSetup)
    const saved = {...defaultTransaction(), uuid: 'foo123'}
    act(() => {
      context().saveTransaction(saved)
    })

    expect(context().visibleUuids).toContain('foo123')
    expect(context().visibleUuids.length).toEqual(2)

    act(() => {
      context().saveTransaction(saved)
    })

    expect(context().visibleUuids.length).toEqual(2)
  })

  it('replaces an existing transaction', () => {
    const context = renderGetContext(renderTestSetup)
    expect(context().transactions.length).toEqual(1)

    const transaction = defaultTransaction()
    act(() => {
      context().saveTransaction(transaction)
    })

    expect(context().transactions.length).toEqual(2)
  })

  it('highlights an existing transaction', () => {
    const context = renderGetContext(renderTestSetup)

    act(() => {
      context().saveTransaction({...defaultTransaction(), uuid: 'foo123'})
    })
    act(() => {
      context().saveTransaction({...defaultTransaction(), uuid: 'bar234'})
    })

    expect(context().highlightedUuid).toEqual('bar234')

    act(() => {
      context().hideTransaction('bar234')
    })
    expect(context().highlightedUuid).toEqual('foo123')
  })

  it('hides an existing transaction', () => {
    const context = renderGetContext(renderTestSetup)
    const saved1 = {...defaultTransaction(), uuid: 'foo123'}
    const saved2 = {...defaultTransaction(), uuid: 'bar234'}

    act(() => {
      context().saveTransaction(saved1)
    })
    act(() => {
      context().saveTransaction(saved2)
    })
    act(() => {
      context().hideTransaction('bar234')
    })

    expect(context().visibleUuids.length).toEqual(2)
    expect(context().visibleUuids).toContain('foo123')
    expect(context().highlightedUuid).toEqual('foo123')
  })

  it('updates the request portion of an existing transaction', () => {
    const context = renderGetContext(renderTestSetup)
    const transaction = {...defaultTransaction(), request: {...defaultRequest(), uri: 'https://example.com'}}

    act(() => {
      context().saveTransaction(transaction)
    })

    expect(context().transactions.map(t => t.request.uri)).toEqual(['', 'https://example.com'])

    const update: Partial<Transaction> = {
      request: {...transaction.request, uri: 'https://example.com/foo'}
    }

    act(() => {
      context().updateTransaction(transaction.uuid, update)
    })

    expect(context().transactions.map(t => t.request.uri)).toEqual(['', 'https://example.com/foo'])
  })
})