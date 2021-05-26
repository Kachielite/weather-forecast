import React from 'react';
import {Switch, Route} from 'react-router-dom'
import HomePage from './PageComponent/HomePage';
import ForecastPage from './PageComponent/ForecastPage'
import TitleBar from './AppComponents/TitleBar';
import Error from './AppComponents/Error'
import {WeatherProvider} from './DataStore/WeatherContext';

import './App.css';

function App() {


  return (
    <WeatherProvider>
      <div className="App">
        <TitleBar/>
        <Error/>
        <Switch>
          <Route exact path={["/", "/forecast"]} component={HomePage}/>
          <Route exact path="/forecast/:cityName" component={ForecastPage}/>
        </Switch>
      </div>
    </WeatherProvider>
  );
}

export default App;
