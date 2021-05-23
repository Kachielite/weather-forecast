import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Line, Bar} from 'react-chartjs-2';
import {WeatherContext} from '../DataStore/WeatherContext'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display:'flex',
    justifyContent:'center',
    background:"#FFFF"

  },
  chart: {
    width:'40%',
    '@media (max-width: 450px)' : {
      width: '100%',
      height:'30%'
    }
  },
  
}));


const Chart = () => {

  const classes = useStyles();

  const {dailyConditions, weekdays, userQuery} = useContext(WeatherContext)
  const {tempMin,tempMax,windSpeed,humidity} = dailyConditions



  const dataBar = {
    labels: [weekdays[0], weekdays[1], weekdays[2], weekdays[3], weekdays[4],weekdays[5], weekdays[6]],
    datasets:[
    {
            label: 'Min Temp(°C)',
            backgroundColor:['blue'],
            data: [tempMin[0], tempMin[1], tempMin[2], tempMin[3], tempMin[4],tempMin[5], tempMin[6]]
    },
    {
        label: 'Max Temp(°C)',
        backgroundColor:['red'],
        data: [tempMax[0], tempMax[1], tempMax[2], tempMax[3], tempMax[4],tempMax[5], tempMax[6]]
    },
    {
      label: 'Humidity(%)',
      backgroundColor:['yellow'],
      data: [humidity[0], humidity[1], humidity[2], humidity[3], humidity[4],humidity[5], humidity[6]]
    },
    {
        label: 'Wind Speed(KM/h)',
        backgroundColor:['green'],
        data: [windSpeed[0], windSpeed[1], windSpeed[2], windSpeed[3], windSpeed[4],windSpeed[5], windSpeed[6]]
    }],
    borderWidth: 1
  }

  const optionBar ={
    legend:{display:true},
    title:{display: true, text:`7 days weather forecast for ${userQuery}`},
    scales: {
        x: {
            
              offset: true
        }
    }
  }


  
    return (
      <div className={classes.root}>
      <div className={classes.chart} >
        <Bar data={dataBar} options={optionBar}/>
      </div>
      </div>
    )
}

export default Chart
