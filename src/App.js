import React from 'react';
import './App.scss';
import 'animate.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/loginpage';
import HomePage from './pages/homepage';


function App() {
  return (
    <div className="App">
 <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          
          {/* <Route exact path="/Home" element={<HomePage />} /> */}

        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
