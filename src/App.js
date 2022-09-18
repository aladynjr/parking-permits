import React, {useEffect} from 'react';
import './App.scss';
import 'animate.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/loginpage';
import HomePage from './pages/homepage';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'


function App() {
  useEffect(()=>{
    TimeAgo.addDefaultLocale(en)

  },[])
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
