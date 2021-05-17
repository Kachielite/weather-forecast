import React from 'react';
import {useParams} from 'react-router-dom';
import SwitchDisplay from '../AppComponents/SwitchDisplay'
import Grid from '@material-ui/core/Grid';


import './forecastpage.css';

const ForecastPage = () => {

    const {cityName} = useParams();    
    console.log(cityName)

    return(
        <div className="forecast-div">
            <Grid container spacing={5} className="weather-details">
            <Grid item xs={12} sm={6} md={4} >
            <div >
                <div className="city-div">
                    <h1>{cityName.charAt(0).toUpperCase() + cityName.slice(1)}</h1>
                    <h2>02-05-2021</h2>
                </div>
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <div className="weather-div">
                    <h3>Current weather details</h3>
                    <h3>Temperature: x°C / y°F</h3>
                    <h3>Wind: w km/h</h3>
                    <h3>Humidity: k%</h3>
                </div>
            </Grid>
            </Grid>
            <div className="visual-details">
                <div className="display-div">
                    <SwitchDisplay/>
                </div>
                
            </div>
            <div className="history-div">

            </div>
        </div>
    )
}

export default ForecastPage;