import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {useAuthContext} from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <useAuthContext>
    <App />
    </useAuthContext>
  </React.StrictMode>,
  document.getElementById('root')
);