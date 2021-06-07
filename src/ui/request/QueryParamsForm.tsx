import React from 'react'
import styled from 'styled-components'
import {QueryParam} from 'domain/Request'

type OnChanged = (p: QueryParam[]) => void


const ParamForm = (props: Readonly<{param: QueryParam, onQueryParamsChanged: OnChanged}>) => {

}
type Props = Readonly<{
  queryParams: QueryParam[]
  onQueryParamsChanged: OnChanged
}>

export const QueryParamsForm = (props: Props) => {
  return (
    <section>

    </section>
  )
}