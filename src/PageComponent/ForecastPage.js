import React, {useState, useContext} from 'react';
import {Link,useParams} from 'react-router-dom';
import SwitchDisplay from '../AppComponents/SwitchDisplay';
import SearchHistory from '../AppComponents/SearchHistory'
import SwitchButton from '../AppComponents/SwitchButton'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {WeatherContext} from '../DataStore/WeatherContext'


import './forecastpage.css';

const ForecastPage = () => {



    const {currentCondition} = useContext(WeatherContext)

    console.log(currentCondition)
    const {city, checkedOn, temp, wind, humidity} = currentCondition
   
    const [searchHistory, setSearchHistory] = useState(true)

    const searchHistoryHandler = () =>{
        if(searchHistory){
            setSearchHistory(false)
        }else{
            setSearchHistory(true)
        }
    }

    return(
        <div className="forecast-div">
            <Grid container spacing={5} className="weather-details">
            <Grid item xs={12} sm={6} md={4} >
            <div >
                <div className="city-div">
                    <h1>{city.charAt(0).toUpperCase() + city.slice(1)}</h1>
                    <h3>{checkedOn}</h3>
                </div>
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <div className="weather-div">
                    <h3>Current weather details</h3>
                    <h3>Temperature: {temp}</h3>
                    <h3>Wind: {wind}</h3>
                    <h3>Humidity: {humidity}</h3>
                </div>
            </Grid>
            </Grid>
            <div className="visual-details">
                <div className="display-div">
                    <h3>Forecast for next 7 days</h3>
                    <SwitchDisplay/>
                </div>
                <div className="visual-div">
                    
                </div>
            </div>
            <div className="link">
                <Button color="primary" variant="outlined" >
                    <Link to='/' style={{textDecoration:'none'}}>
                        <p>Go to home page</p>
                    </Link>
                </Button>
            </div>
            <div className="history-div">
                <div style={{display:'flex', alignItems:'flex-start', margin: '20px auto'}}><SwitchButton searchHistoryHandler={searchHistoryHandler}/></div>
                {searchHistory && <SearchHistory/>}
            </div>
        </div>
    )
}

export default ForecastPage;