import {ChangeEvent} from 'react'

export const replaceAt = <T>(array: T[], item: T, index: number) =>
  array.map((q, i) => {
    if (index == i) {
      return item
    }
    return q
  })

export const removeAt = <T>(array: T[], index: number) =>
  array.filter((q, i) => index !== i)

export const eventValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => e.target.value

export const assignTo = <T>(key: keyof T) => (value: T[typeof key]) => ({[key]: value})

export const callWithDefaults = <T>(fn: (a: T) => void, defaults: T) => (newValues: Partial<T>) => fn({...defaults, ...newValues})
