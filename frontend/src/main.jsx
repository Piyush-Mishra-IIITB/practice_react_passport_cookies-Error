import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard from './Dashboard.jsx'
createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <Routes>
       <Route path="/" element={<App/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
 </BrowserRouter>

)
