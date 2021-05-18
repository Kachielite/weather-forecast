import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {WeatherContext} from '../DataStore/WeatherContext'



const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '90vw',
    maxWidth: '50rem'
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Search() {

  const classes = useStyles();

  const {onSubmit, searchHandler} = useContext(WeatherContext)

      


  return (
    <Paper component="form" className={classes.root} onSubmit={onSubmit}>
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <InputBase
        className={classes.input}
        placeholder="Enter the city name to get the weather forecast"
        onChange={searchHandler}

        />
    </Paper>
  );
}