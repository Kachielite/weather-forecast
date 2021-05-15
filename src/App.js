import React from 'react';
import HomePage from './PageComponent/HomePage';
import TitleBar from './AppComponents/TitleBar';

import './App.css';

function App() {
  return (
    <div className="App">
      <TitleBar/>
      <HomePage/>
    </div>
  );
}

export default App;
