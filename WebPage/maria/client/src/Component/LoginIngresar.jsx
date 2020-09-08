import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from 'axios';
import { connect } from 'react-redux'
import { setUser } from '../store/actions/user.js'
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Henry Beers
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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

function SignIn(props) {

  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(false); // para activar la letra roja desde material-UI
  const [helperText, setHelperText] = useState('');

  let history = useHistory();

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const submitLogIn = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/auth/login', {
      email: input.email,
      password: input.password
    }, { withCredentials: true }).then(res => {
      const { status, message, user } = res.data; // Siempre vamos a mandar un status en register, para verificar que esta logueado (ok) o no (error).
      if (status === 'error') {
        setError(true);
        setHelperText(`Error al iniciar sesion: ${message}`);
      } else { // el usuario se creo bien
        setHelperText('')
        props.setUser(user)
        history.replace('/products');
      }
    }).catch(err => {
      setHelperText('Error al iniciar sesion: Email o contraseña incorrecta')
    })
  }

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <form onSubmit={submitLogIn} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Direccion de email"
            name="email"
            type='email'
            value={input.email}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            value={input.value}
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordarme"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>

          <FormHelperText error={'TendriaQir: {error} pero rompe'}> {helperText} </FormHelperText>

          <Grid container justify="flex-end">
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Olvido su Contraseña?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="http://localhost:3000/registrarse" variant="body2">
                ¿No tiene una cuenta? Registrarse
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>

    </Container>
  );
}
const mapStateToProps = ({ user }) => ({
  user,
})

const mapDispatchToProps = dispatch => ({
  setUser: (user) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
