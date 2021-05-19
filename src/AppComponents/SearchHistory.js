import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {WeatherContext} from '../DataStore/WeatherContext';






const useStyles = makeStyles((theme) => ({

  cardGrid: {
    // paddingTop: theme.spacing(4),
    // paddingBottom: theme.spacing(4),
    width:'100%',
    height:'100%'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign:'left'
  },
  cardContent: {
    flexGrow: 1,
  },
  button:{
    display: 'flex',
    justifyContent:'flex-end'
  },
  link:{
    textDecoration:'none'
  }
}));



export default function SearchHistory() {
  const classes = useStyles();
  const {searched} = useContext(WeatherContext);


 

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Paper className={classes.container}>
        <Container className={classes.cardGrid} >
          <Grid container spacing={3}>
            {searched.slice(0,9).map((card) => {
              return(
              <Grid item xs={12} sm={6} md={4} key={card.cityName}>
                <CardActionArea>
                  <Link to={`/forecast/${card.cityName.charAt(0).toLowerCase() + card.cityName.slice(1)}`} className={classes.link}>
                    <Card className={classes.card} >
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h7" component="h2">
                            {card.cityName}
                        </Typography>
                        <Typography>
                            Checked on: {card.checkedOn}                   
                        </Typography>
                        <div className={classes.button}>
                          <MoreVertIcon/>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CardActionArea>
              </Grid>)
              })}
          </Grid>
        </Container>
        </Paper>
      </main>
    </React.Fragment>
  );
}