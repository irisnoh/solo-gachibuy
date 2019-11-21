import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button, Grid, Paper, Typography } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import ListItem from '../ListForm/ListForm'
import GroupList from '../GroupList/GroupList'
import CardExample from '../GroupList/Card'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    marin: 'auto',
    maxWidth: 500,
    color: 'orange',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  card: {
    display: 'flex',
    maxWidth: 345,
    color: "red",
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
};

const theme = createMuiTheme({
  palette: {
    primary: { main: '#4ac29a' },
  },
});



class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "GET_GROUP" });
  }

  onCreate = () => {
    console.log('create hit');
    this.props.history.push('/Groupform')
  }

  // get for groups and put in componenet did mount
  render() {
    return (

      <>
        <ThemeProvider theme={theme}>

          <div className="pageView">
            <div style={styles.root}>
              <div>
                <DrawerNav />
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid>
                    <Paper style={styles.paper}>
                      <h1 id="welcome">
                        Hello, {this.props.user.username}!</h1>
                    </Paper>

                    <Button onClick={this.onCreate} startIcon={<CreateIcon />} > Create New Group </Button>
                  </Grid>
                  {/* <TextField onSubmit={this.onCreate}
                    id="standard"
                    label="Add Groups"
                    margin="normal"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddCircleOutlineIcon color="primary" />
                        </InputAdornment>
                      )
                    }}
                  >
                  </TextField> */}
                  <Paper style={styles.paper}><h2>Groups</h2></Paper>
                  {/* MAP FUNCTION TO GO THROUGH ALL MY GROUP LISTS */}
                  {this.props.groupReducer.map((group, i) =>
                    <GroupList group={group} key={i} />
                  )}
                  <CardExample />
                  <p>Your ID is: {this.props.user.id} </p>
                </Grid>
              </div>
            </div>
          </div>
          <pre> {JSON.stringify(this.props.groupReducer, null, 2)}</pre>
          <pre> {JSON.stringify(this.props.user.username, null, 2)}</pre>
        </ThemeProvider>
      </>
    )
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(UserPage);

