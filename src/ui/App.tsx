import * as React from 'react'
import {Request} from 'ui/Request'

export const App = () => <div>
  <h1>sendperson</h1>
  <Request method={'GET'} onMethodChanged={() => {}} onUriChanged={() => {}} onSendPressed={() => {}}/>
</div>