import React from 'react';
import './App.css';
import Header from './Header';
import Body from './Body';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
          <Header />
          <Body />
      </div>
    </BrowserRouter>
  );
}

export default App;
