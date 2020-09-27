import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = withStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      login: false,
      store: null,
    }
  }

  componentDidMount() {
    this.storeCollector()
  }

  storeCollector() {
    let store = JSON.parse(localStorage.getItem('login'));
    if (store && store.login) {
      this.setState({ login: true, store: store })
    }
  }

  login() {
    fetch('http://localhost:8082/user/authenticate', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then((response) => {
      response.json().then((result) => {
        console.warn("result", result);
        localStorage.setItem('login', JSON.stringify({
          login: true,
          store: result.jwt
        }))
        this.storeCollector()

      })
    })
  }

  post() {
    let token = "Bearer" + this.state.store.token
    fetch('http://localhost:8082/admin/seat?status=confirmed', {
      method: "GET",
      headers: {
        'Authorization': token
      },
      body: JSON.stringify(this.state.get)
    }).then((response) => {
      response.json().then((result) => {
        console.warn("result", result);

      })
    })
  }

  render() {
    const classes = useStyles;
    return (

      /*!this.state.login ?
        <div>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
        </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  onChange={(event) => { this.setState({ username: event.target.value }) }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  onChange={(event) => { this.setState({ password: event.target.value }) }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  //type="submit"
                  onClick={() => { this.login() }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
          </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
              </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </div>
        :
        <div>
          <textarea onChange={(event) => this.setState({ post: event.target.value })}>

          </textarea>
          <button onClick={() => { this.post() }}>Post</button>
        </div>
        */
        <div>

          {
            //if login is not true return the form again
            !this.state.login ?
              <div>
                <input type="text" onChange={(event) => { this.setState({ username: event.target.value }) }} /> <br /><br />
                <input type="password" onChange={(event) => { this.setState({ password: event.target.value }) }} /> <br /><br />
                <button onClick={() => { this.login() }}>Login</button>
              </div>

              //else login and go to the text area; did not define post mapping
              :
              <div>
                <textarea onChange={(event) => this.setState({ post: event.target.value })}>
  
                </textarea>
                <button onClick={() => { this.post() }}>Post</button>
              </div>
          }
        </div >
      );
  }

}

export default Login