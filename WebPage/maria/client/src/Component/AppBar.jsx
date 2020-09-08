import React from "react";
import { AppBar, Toolbar } from "@material-ui/core/";
import { Link } from "react-router-dom";
import "./AppBar.css";
import { emphasize, withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { connect } from 'react-redux'
import axios from 'axios';

// S48: Crear Componente NavBar

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(5),
    margin: theme.spacing(2),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

const setearDefault = function (e) {
  axios.post("http://localhost:4000/", { withCredentials: true })
    .then((res) => { res.status('Ok') })
    .catch(err => console.log(err));
};



const Bar = (props) => {
  const { user } = props
  return (
    <AppBar position="static">
      <Toolbar>
        <Link onClick={e => setearDefault()} style={{ textDecoration: 'none' }} to="/">
          <img
            className="logo"
            src="https://previews.123rf.com/images/bsd555/bsd5551706/bsd555170600826/80932809-brindando-vasos-de-cerveza-icono-de-la-larga-sombra-de-dise%C3%B1o-plano-aclamaciones-dos-vasos-de-cerveza-e.jpg"
            alt=""
          />
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/">
          <StyledBreadcrumb
            component="a"
            label="Home"
            icon={<HomeIcon fontSize="large" />}
          />
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/products">
          <StyledBreadcrumb
            component="a"
            label="Catalogo"
            icon={<MenuBookIcon fontSize="large" />}
          />
        </Link>

        {user.setUser && user.setUser.admin && (
          <Link style={{ textDecoration: 'none' }} to="/admin_ingreso">
            <StyledBreadcrumb
              component="a"
              label="Admin"
              icon={<AccountCircle fontSize="large" />}
            />

          </Link>
        )}
        <Link style={{ textDecoration: 'none' }} to='/carrito'>

          <StyledBreadcrumb
            component="a"
            label={props.carrito.productAdded.length}
            icon={<ShoppingCart fontSize="large" />}
          />
        </Link>
        <div className="login">
          {!user.setUser && (
            <Link style={{ textDecoration: 'none' }} to="/ingresar">
              <StyledBreadcrumb
                component="a"
                label="Ingresar"
                icon={<AccountCircle fontSize="large" />}
              />
            </Link>
          )}
          {!user.setUser && (
            <Link style={{ textDecoration: 'none' }} to="/registrarse">
              <StyledBreadcrumb
                component="a"
                label="Registrarse"
                icon={<AccountCircle fontSize="large" />}
              />
            </Link>
          )}



          {user.setUser && (

            <Link style={{ textDecoration: 'none' }} to="/Ordenes">
              <StyledBreadcrumb
                component="a"
                label="Ordenes"
                icon={<LibraryBooksIcon fontSize="large" />}
              />
            </Link>
          )}
        </div>

        {user.setUser && (
          <Link style={{ textDecoration: 'none' }} to="/me">
            <StyledBreadcrumb
              component="a"
              label="Mi Perfil"
              icon={<AccountCircle fontSize="large" />}
            />
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ carrito, user }) => ({
  carrito, user
})
export default connect(mapStateToProps, null)(Bar)
