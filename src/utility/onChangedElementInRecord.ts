import {ChangeEvent} from 'react'

const isChangeEvent = (obj: any): obj is ChangeEvent<HTMLInputElement> => obj.target && obj.target.value

export const onChangedElementInRecord = <TObj>(onParentChange: (newValue: TObj) => void, currentValue: TObj) => {
  return <TKey extends keyof TObj>(prop: TKey) => (valueOrEvent: TObj[TKey] | ChangeEvent<HTMLElement>) => {
    const value = isChangeEvent(valueOrEvent) ? valueOrEvent.target.value : valueOrEvent
    onParentChange({...currentValue, [prop]: value})
  }
}
