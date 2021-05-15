import React from 'react';
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
import Button from '@material-ui/core/Button';






const useStyles = makeStyles((theme) => ({

  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '5px',
    textAlign:'left'
  },
  cardContent: {
    flexGrow: 1,
  },
  button:{
    display: 'flex',
    justifyContent:'flex-end'
  }
}));




export default function SearchHistory() {
  const classes = useStyles();

  const searchHistory = [
    {
      cityName: 'Paris',
      checkedOn: '24-05-2021'
    },
    {
      cityName: 'Lagos',
      checkedOn: '12-05-2021'
    },
    {
      cityName: 'Tokyo',
      checkedOn: '04-05-2021'
    },
    {
      cityName: 'Nairobi',
      checkedOn: '18-05-2021'
    },
    {
      cityName: 'Berlin',
      checkedOn: '02-05-2021'
    },
    {
      cityName: 'London',
      checkedOn: '03-05-2021'
    },
    {
      cityName: 'New York',
      checkedOn: '13-05-2021'
    },
    {
      cityName: 'Yaounde',
      checkedOn: '24-05-2021'
    },
    {
      cityName: 'Lisbon',
      checkedOn: '14-05-2021'
    },
  ]
 

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Paper className={classes.container}>
        <Container className={classes.cardGrid} >
          <Grid container spacing={5}>
            {searchHistory.map((card) => {
              return(
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardActionArea>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {card.cityName}
                    </Typography>
                    <Typography>
                        Checked on: {card.checkedOn}                   
                    </Typography>
                    <Button href="#text-buttons" color="primary" className={classes.button}>
                      <MoreVertIcon/>
                    </Button>
                  </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>)
              })}
          </Grid>
        </Container>
        </Paper>
      </main>
    </React.Fragment>
  );
}