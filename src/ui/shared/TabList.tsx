import {pipe} from 'ramda'
import React, {Fragment, MouseEventHandler} from 'react'
import {preventDefault} from 'utility/utilities'

import styles from './TabList.scss'

type TabListProps<T> = Readonly<{
  items: T[]
  selected: number
  renderTitle: (item: T) => string
  getId: (item: T) => string
  onSelected: (index: number) => void
  onClosed: (index: number) => void
  onNewClicked: () => void
}>

export const TabList = <T, U>(props: TabListProps<T>) => {
  const {items, selected, renderTitle, onSelected, getId, onClosed, onNewClicked} = props

  const renderTab = (item: T, index: number) => {
    const onClick: MouseEventHandler = pipe(preventDefault, () => onSelected(index))
    return <li key={getId(item)} className="nav-item" data-testid="tab">
      <a className={`${styles.navLink} ${index === selected ? styles.active : ''}`} href="#" onClick={onClick}>
        <span>{renderTitle(items[index])}</span>
        <button type="button"
                data-testid="close button"
                className={`${styles.closeButton}`}
                aria-label="Close"
                onClick={pipe(preventDefault, () => onClosed(index))}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x"
               viewBox="0 0 16 16">
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </a>
    </li>
  }

  return <Fragment>
    <ul className="nav">
      {items.map(renderTab)}
      <li className="nav-item">
        <a className={`${styles.navLink} ${styles.addButton}`} href="#" aria-label="Add new"
           onClick={pipe(preventDefault, onNewClicked)}>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus"
               viewBox="0 0 16 16">
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
        </a>
      </li>
    </ul>
  </Fragment>
}