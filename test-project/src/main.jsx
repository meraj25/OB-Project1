import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Routes, Route } from "react-router";
import HomePage from "./pages/home.page"
import LoginPage from './pages/login.page';
import SignupPage from './pages/signup.page';
import {store} from './lib/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<SignupPage/>}/>


      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
