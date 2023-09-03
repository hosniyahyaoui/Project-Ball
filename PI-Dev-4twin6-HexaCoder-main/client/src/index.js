import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import ContDash from './components/backOfiice/ContDash';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// c1
import Invoices from './components/Invoices'
import Footer from './components/backOfiice/footer';

// c2


ReactDOM.render(
  <BrowserRouter>
  <Routes>
  <Route  exact path="/admin" element={<ContDash />} />
    <Route path="/" element={<App />} />
   
  </Routes>
</BrowserRouter>,
  document.getElementById('root')
);







/*  c3  */


reportWebVitals();
