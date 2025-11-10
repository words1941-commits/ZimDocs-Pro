import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './i18n/setup'

const root = createRoot(document.getElementById('root'))
root.render(<App />)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => console.warn('SW failed', err))
  })
}
