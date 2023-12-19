import { createRoot } from 'react-dom/client';
import './index.css'
import axios from 'axios'
import App from './App'

axios.get('/api/persons').then(response => {
    const persons = response.data
    createRoot(document.getElementById('root')).render(<App persons={persons}/>)
})
