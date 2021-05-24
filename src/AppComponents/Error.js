import React,{useContext} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {WeatherContext} from '../DataStore/WeatherContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const {errMsg, setTriggerError,triggerError} = useContext(WeatherContext);
  

  const handleClose = () => {
 
    setTriggerError(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={triggerError} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
        <Alert onClose={handleClose} severity="error">
          <p>Error: {errMsg}</p>
        </Alert>
      </Snackbar>
    </div>
  );
}