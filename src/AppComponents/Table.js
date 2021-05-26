import React, {useContext} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {WeatherContext} from '../DataStore/WeatherContext';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3F51B5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  /* Consuming context data */
  const {dailyConditions, weekdays} = useContext(WeatherContext)
  const {weatherIcon,tempMin,tempMax,windSpeed,humidity} = dailyConditions

  

  function createData(name, Day1,Day2,Day3,Day4,Day5,Day6,Day7) {
    return { name ,Day1,Day2,Day3,Day4,Day5,Day6,Day7};
  }



  const weather = (item)=>{
    return(<img src={`https://openweathermap.org/img/wn/${item}@2x.png`} alt="weather-icon"/>)
  }

  const rows = [
    createData('Condition',weather(weatherIcon[0]),weather(weatherIcon[1]),weather(weatherIcon[2]),weather(weatherIcon[3]),weather(weatherIcon[4]),weather(weatherIcon[5]),weather(weatherIcon[6])),
    createData('Min Temperature(°C)', tempMin[0], tempMin[1], tempMin[2], tempMin[3], tempMin[4],tempMin[5], tempMin[6]),
    createData('Max Temperature(°C)', tempMax[0], tempMax[1], tempMax[2], tempMax[3], tempMax[4],tempMax[5], tempMax[6]),
    createData('Wind Speed(Km/h)',  windSpeed[0], windSpeed[1], windSpeed[2], windSpeed[3], windSpeed[4],windSpeed[5], windSpeed[6]),
    createData('Humidity(%)', humidity[0], humidity[1], humidity[2], humidity[3], humidity[4],humidity[5], humidity[6]),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Days</StyledTableCell>
            {weekdays.map(item => {
              return <StyledTableCell align="center" key={item}>{item}</StyledTableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.Day1}</StyledTableCell>
              <StyledTableCell align="center">{row.Day2}</StyledTableCell>
              <StyledTableCell align="center">{row.Day3}</StyledTableCell>
              <StyledTableCell align="center">{row.Day4}</StyledTableCell>
              <StyledTableCell align="center">{row.Day5}</StyledTableCell>
              <StyledTableCell align="center">{row.Day6}</StyledTableCell>
              <StyledTableCell align="center">{row.Day7}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
