import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './PageComponent/HomePage';
import ForecastPage from './PageComponent/ForecastPage'
import TitleBar from './AppComponents/TitleBar';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <TitleBar/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/forecast/:cityName" component={ForecastPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
