import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from 'react-redux'
import axios from 'axios';
import swal from 'sweetalert';
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

function ResetPassword(props) {
  // const { id } = useParams();
  const { user } = props;
  const [input, setInput] = useState({
    password: '',
    repassword: ''
  });

  // const [error, setError] = useState(false); // para activar la letra roja desde material-UI
  // const [helperText, setHelperText] = useState('');

  let history = useHistory();

  let handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const submitLogIn = (e) => {
    e.preventDefault();

    if(input.password == input.repassword){axios.put(`http://localhost:4000/auth/${user.setUser.id}/passwordReset`, { 
      password: input.password
    }, { withCredentials: true }).then(res => {
      console.log(res)
      history.replace('/products');
    }).catch(err => {
      console.log(err)
    })}else{
      swal("", "Las contraseñas deben coincidir!")
    }
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
          *Ingresar su nueva contraseña*
        </Typography>
        <form onSubmit={submitLogIn} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Nueva contraseña"
            type="password"
            id="password"
            value={input.password}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="repassword"
            label="Confirme contraseña"
            type="password"
            id="repassword"
            value={input.repassword}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            cambiar contraseña
          </Button>
          <Grid container justify="flex-end">
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
  user
});


export default connect(mapStateToProps, null)(ResetPassword)