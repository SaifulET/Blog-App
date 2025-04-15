import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import axios from 'axios';
axios.defaults.baseURL = 'https://blog-app-backend-indol.vercel.app/api';
// axios.defaults.baseURL = 'http://localhost:5000/api';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
