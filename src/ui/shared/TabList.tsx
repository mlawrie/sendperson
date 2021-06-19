import {pipe} from 'ramda'
import React, {Fragment, MouseEventHandler} from 'react'
import {preventDefault} from 'utility/utilities'

type TabListProps<T> = Readonly<{
  items: T[]
  selected: number
  renderTitle: (item: T) => string
  getId: (item: T) => string
  onSelected: (index: number) => void
}>

export const TabList = <T, U>(props: TabListProps<T>) => {
  const {items, selected, renderTitle, onSelected, getId} = props

  const renderTab = (item: T, index: number) => {
    const onClick: MouseEventHandler = pipe(preventDefault, () => onSelected(index))
    return <li key={getId(item)} className="nav-item" data-testid="tab">
      <a className={`nav-link ${index === selected ? 'active' : ''}`} href="#" onClick={onClick}>
        {renderTitle(items[index])}
      </a>
    </li>
  }

  return <Fragment>
    <ul className="nav nav-tabs">
      {items.map(renderTab)}
    </ul>
  </Fragment>
}