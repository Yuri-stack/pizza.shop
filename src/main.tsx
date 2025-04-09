import ReactDOM from 'react-dom/client'

import { App } from './App'
import { enableMSW } from './api/mocks'

enableMSW().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
})
