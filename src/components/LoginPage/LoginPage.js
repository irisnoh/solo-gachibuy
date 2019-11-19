import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoginPage.css';
import { Typography, Box, Container, TextField, CssBaseline, FormControlLabel, Checkbox, Button, Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


class LoginPage extends Component {


  state = {
    username: '',
    password: '',
  };

  login = (event) => {

    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },

      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }

  } // end login

  handleInputChangeFor = propertyName => (event) => {

    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {

    return (
      <>
        <div className="login">
          <Typography component="h1" variant="h9">
            Gachi-Buy        </Typography>

        <div>
          {this.props.errors.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.loginMessage}
            </h2>
          )}

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="paper" >
              <div className="Avatar">
                <LockOutlinedIcon color="secondary" text-align="center" />
            </div>
              <Typography component="h1" variant="h5">
                Sign in
        </Typography>
              <form onSubmit={this.login}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="username"
                  autoFocus
                  type="text"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="log-in"
                  name="submit"
                  value="Log In"
                >
                  Sign In
          </Button>
                <Grid container>
                  <Grid item>
                    <center>
                      <button
                        type="button"
                        className="link-button"
                        onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
                      >
                        Register </button>
                    </center>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
            </Box>
          </Container>
          {/* old form code below */}
          {/* <form onSubmit={this.login}>
            <h1>Login</h1>
            <div>
              <label htmlFor="username">
                Username:
              <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password:
              <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </label>
            </div>
            <div>
              <input
                className="log-in"
                type="submit"
                name="submit"
                value="Log In"
              />
            </div>
          </form>
          <center>
            <button
              type="button"
              className="link-button"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
            >
              Register
          </button>
          </center> */}
        </div>
        </div>

      </>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
