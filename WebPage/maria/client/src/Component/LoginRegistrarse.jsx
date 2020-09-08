import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormHelperText from '@material-ui/core/FormHelperText';
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from 'axios';
import swal from 'sweetalert';
import {
  useHistory,
} from "react-router-dom";

function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [error, setError] = useState(false); // para activar la letra roja desde material-UI
  const [helperText, setHelperText] = useState('');

  const [field, setField] = useState({
    first_name: "",
    last_name: "",
    adress: "",
    email: "",
    password: ""
  });

  let history = useHistory();

  const handleChange = function (e) {
    setField({
      ...field,
      [e.target.name]: e.target.value
    });
  }
  const submitUser = function (e) {
    e.preventDefault()

    if (field.password !== field.repassword) {
      return swal("", "...Las contraseñas deben coincidir!")
    }

    axios.post('http://localhost:4000/auth/register', {
      first_name: field.first_name,
      last_name: field.last_name,
      adress: field.adress,
      email: field.email,
      password: field.password,
      active: true
    }, { withCredentials: true })
      .then(res => {
        const { status, message } = res.data; // Siempre vamos a mandar un status en register, para verificar que esta logueado (ok) o no (error).
        if (status === 'error') {
          setError(true);
          setHelperText(`Error al registrarse: ${message}`);
        } else { // el usuario se creo bien
          setHelperText('')
          history.replace('/ingresar');
        }
      }).catch(err => {
        setHelperText(err)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <form className={classes.form} onSubmit={submitUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                type='text'
                value={field.first_name}
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                type="text"
                variant="outlined"
                value={field.last_name}
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="last_name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                type='text'
                value={field.adress}
                name="adress"
                variant="outlined"
                required
                fullWidth
                id="adress"
                label="Direccion"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                value={field.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={field.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={field.repassword}
                variant="outlined"
                required
                fullWidth
                name="repassword"
                label="Confirme su contraseña"
                type="password"
                id="repassword"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarse
          </Button>

          <FormHelperText error={error}> {helperText} </FormHelperText>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="http://localhost:3000/ingresar" variant="body2">
                ¿Ya tiene una cuenta? Ingresar
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
