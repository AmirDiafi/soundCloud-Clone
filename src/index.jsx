import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import * as ServiceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
)

ServiceWorker.register()