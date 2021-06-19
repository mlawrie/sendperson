import {TabList} from 'ui/shared/TabList'
import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'

describe('TabList', () => {
  let onSelected: jest.Mock<any, any>
  const secondTab = async () => await screen.findByText('title: b')

  const setup = (args: {selected: number}) => {
    onSelected = jest.fn()
    render(<TabList items={['a', 'b', 'c']}
                    selected={args.selected}
                    renderTitle={i => `title: ${i}`}
                    getId={i => `id: ${i}`}
                    onSelected={onSelected}/>)
  }

  it('renders a list of tabs', async () => {
    setup({selected: 0})
    const tabs = await screen.findAllByTestId('tab')
    expect(tabs.map(t => t.textContent)).toEqual(['title: a', 'title: b', 'title: c'])
  })
  
  it('renders current tab', async () => {
    setup({selected: 1})
    expect((await secondTab()).className).toContain('active')
  })

  it('calls onSelected when tab clicked', async () => {
    setup({selected: 0})
    fireEvent.click(await secondTab())
    expect(onSelected).toBeCalledWith(1)
  })

})