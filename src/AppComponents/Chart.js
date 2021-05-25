import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Bar} from 'react-chartjs-2';
import {WeatherContext} from '../DataStore/WeatherContext'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    display:'flex',
    justifyContent:'center',
    background:"#FFFF",
    width:'88vw',
    height:'42vh'

  },
  
}));


const Chart = () => {

  const classes = useStyles();

  const {dailyConditions, weekdays} = useContext(WeatherContext)
  const {tempMin,tempMax,windSpeed,humidity} = dailyConditions



  const dataBar = {
    labels: weekdays,
    datasets:[
    {
            label: 'Min Temp(°C)',
            backgroundColor:['#3F51B5'],
            data: tempMin
    },
    {
        label: 'Max Temp(°C)',
        backgroundColor:['#5D5C61'],
        data: tempMax
    },
    {
      label: 'Humidity(%)',
      backgroundColor:['#B1A296'],
      data: humidity
    },
    {
        label: 'Wind Speed(KM/h)',
        backgroundColor:['#7395AE'],
        data: windSpeed
    }],
    borderWidth: 1
  }

  const optionBar ={
    maintainAspectRatio: false,
  }


  
    return (
      <Paper className={classes.root}>
        <Bar data={dataBar} options={optionBar}/>
      </Paper>
    )
}

export default Chart
