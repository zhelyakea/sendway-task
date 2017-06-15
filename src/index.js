import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import Messages from 'components/MessagesContainer'

const store = configureStore()

require('../css/style.css')
require('../css/flex.css')

ReactDOM.render(
  <Provider store={store}>
    <Messages />
  </Provider>,
  document.getElementById('root')
)
