import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import SwitchDisplay from '../AppComponents/SwitchDisplay';
import SearchHistory from '../AppComponents/SearchHistory'
import SwitchButton from '../AppComponents/SwitchButton';
import Loading from '../AppComponents/Loading';
import Table from '../AppComponents/Table';
import Chart from '../AppComponents/Chart';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {WeatherContext} from '../DataStore/WeatherContext'


import './forecastpage.css';

const ForecastPage = () => {

    /* Consuming context data */
    const {currentCondition, loading} = useContext(WeatherContext)
    const {city, checkedOn, tempInCel, tempInFah, wind, humidity} = currentCondition
   
    /* State management for the switch button that toggles the search history component  and this is passed down to SearchHistory Component*/
    const [searchHistory, setSearchHistory] = useState(true)
    /* State management for the SwitchDisplay component that toggles display for the 7 day weather forecast and this is passed down to SwitchDisplay Component*/
    const [selected, setSelected] = useState('table')


    /* Toggles the SearchHistory Component */
    const searchHistoryHandler = () =>{
        if(searchHistory){
            setSearchHistory(false)
        }else{
            setSearchHistory(true)
        }
    }
    /* Defines what component should be rendered when switch display component is toggled */
    const View = () => {
        if(selected === "chart"){
            return <Chart/>
        } else{
            return <Table/>
        }
    }

    return(
        <React.Fragment>
        {/* Render the Loading component when component is true otherwise render the content of the forecast page */}
        {loading?<div className="loading"><Loading/></div>:
            <div className="forecast-div">
                <Grid container spacing={5} className="weather-details">
                <Grid item xs={12} sm={6} md={4} >
                <div >
                    <div className="city-div">
                        <h1>{city.charAt(0).toUpperCase() + city.toLowerCase().slice(1)}</h1>
                        <p>{checkedOn}</p>
                    </div>
                </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="weather-div">
                        <h2>Current weather details</h2>
                        <p>Temperature: {tempInCel}°C / {tempInFah}°F</p>
                        <p>Wind: {wind}Km/h</p>
                        <p>Humidity: {humidity}</p>
                    </div>
                </Grid>
                </Grid>
                <div className="visual-details">
                    <div className="display-div">
                        <p>Forecast for next 7 days</p>
                        <SwitchDisplay toggleDisplay={setSelected}/>
                    </div>
                    <div className="visual-div">
                        <View/>
                    </div>
                </div>
                <div className="link">
                    <Button variant="contained" color="primary" >
                        <Link to='/' style={{textDecoration:'none', outline:"none", color:"white"}}>
                            <p>Go to home page</p>
                        </Link>
                    </Button>
                </div>
                <div className="history-div">
                    <div style={{display:'flex', alignItems:'flex-start', marginBottom:'40px', }}><SwitchButton searchHistoryHandler={searchHistoryHandler}/></div>
                    {searchHistory && <SearchHistory/>}
                </div>
            </div>}
        </React.Fragment>
    )
}

export default ForecastPage;