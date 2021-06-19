import {ChangeEvent, UIEvent} from 'react'

export const replaceAt = <T>(array: T[], index: number, item: T) =>
  array.map((q, i) => {
    if (index == i) {
      return item
    }
    return q
  })

export const curry2 = <T1, T2, R>(fn: (a1: T1, a2: T2) => R) => (a1: T1) => (a2: T2) => fn(a1, a2)
export const curry3 = <T1, T2, T3, R>(fn: (a1: T1, a2: T2, a3: T3) => R) => (a1: T1) => (a2: T2) => (a3: T3) => fn(a1, a2, a3)

export const removeAt = <T>(array: T[], index: number) =>
  array.filter((q, i) => index !== i)

export const eventValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => e.target.value
export const eventChecked = (e: ChangeEvent<HTMLInputElement>) => e.target.checked
export const preventDefault = <T, U>(e: UIEvent<T, U>) => {
  e.preventDefault()
  return e
}

export const assignTo = <T>(key: keyof T) => (value: T[typeof key]) => ({[key]: value})

export const withDefaults = <T>(defaults: T) => (newValues: Partial<T>) => ({...defaults, ...newValues})