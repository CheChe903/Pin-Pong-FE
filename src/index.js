// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // 기본 CSS 파일
import './App.css'; // App.css 파일을 가져옵니다
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
