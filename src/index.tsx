import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import Wexin from './components/wexin';
import Txl from './components/TXL';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<App />}>
        <Route path="/wx" element={<Wexin />} />
        <Route path="/txl" element={<Txl />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
