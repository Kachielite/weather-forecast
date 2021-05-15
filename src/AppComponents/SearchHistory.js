import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';






const useStyles = makeStyles((theme) => ({
  container:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '63vh',
    width: '85vw',
    margin: '20px',

  },
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));




export default function SearchHistory() {
  const classes = useStyles();

  const searchHistory = []
 

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Paper className={classes.container}>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {searchHistory.map((card) => {
              return(
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    title={card.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                    </Typography>
                    <Typography>
                        {card.overview.slice(0,200)}...                    
                    </Typography>
                  </CardContent>
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