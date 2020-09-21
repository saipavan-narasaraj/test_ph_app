import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Navbar from "./nav";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { withRouter } from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Photo-gallery-app
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
class Login extends React.Component {
  useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  state = {
    email: "",
    password: "",
  };
  handleOnSubmit = async (event) => {
    event.preventDefault();
    await this.setState({
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    });
    try {
      const data = {
        email: this.state.email,
        password: this.state.password,
      };
      const res = await axios.post("https://photo-gallery-deploy.herokuapp.com/users/login", data);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        this.props.history.push("/image");
      }
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response; // take everything but 'request'
      console.log(errorObject);
      if (errorObject.status === 404) {
        alert("invalid entry");
      }
    }
  };

  render() {
    const classes = this.useStyles;
    return (
      <div>
        <Navbar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <div style={{ textAlign: "center", marginTop: 50 }}>
              <Typography component="h1" variant="h5" style={{ fontSize: 30 }}>
                Sign in
              </Typography>
            </div>
            <br />
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleOnSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                className={classes.submit}>
                Sign In
              </Button>
              <br />
              <br />
              <Grid container>
                <Grid item xs />
                <Grid item>
                  <Link href={process.env.PUBLIC_URL+ "/signup"} variant="body2">
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
    );
  }
}
export default withRouter(Login);
