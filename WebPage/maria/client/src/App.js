import React, { useState, useEffect } from "react";
import { Switch, Redirect } from 'react-router-dom'
import { Route } from "react-router-dom";
import AppBar from "./Component/AppBar.jsx";
import Content from "./Component/Content.jsx";
import DetalleProducto from "./Component/DetalleProducto.jsx";
import AreaAdmin from "./Component/CRUD/AreaAdmin.jsx";
import LoginCambioPassword from "./Component/LoginCambioPassword.jsx";
import LoginRegistrarse from "./Component/LoginRegistrarse.jsx";
import LoginIngresar from "./Component/LoginIngresar.jsx";
import Carrito from "./Component/Carrito.jsx";
import Ordenes from "./Component/Ordenes.jsx";
import Orden from "./Component/Orden.jsx";
import Home from "./Component/Home.jsx";
import Checkout from "./Component/checkout.jsx";
import MiPerfil from "./Component/MiPerfil.jsx";
import DetalleUsuario from "./Component/CRUD/DetalleUsuario.jsx";
import { connect } from 'react-redux'
import { addCategory } from './store/actions/categorias'
import { addProduct } from './store/actions/producto'
import { addProductComentado } from './store/actions/producto'
import axios from "axios";
import "./App.css";
import { setUser } from './store/actions/user';
import { addReview } from './store/actions/reviews';


function App(props) {
  const { user } = props
  const [cats, setCats] = useState([]);
  const [carro, setCarro] = useState([]);
  useEffect(() => {

    axios.get("http://localhost:4000/categories")
      .then(res => {
        res.data.map(elem => {
          props.addCategory(elem)
        })
        /* setCats(res.data); */
      });

    axios.get("http://localhost:4000/products")
      .then(res => {
        res.data.map(elem => {
          props.addProduct(elem)
          if (!!elem.reviews) {
            elem.reviews.map(r => {
              props.addReview(r)
            })
          }
        })
      });

      axios.get("http://localhost:4000/products/junior")
      .then(res => {
        res.data.map(elem => {
          props.addProductComentado(elem)
        })
      });

    axios.get("http://localhost:4000/auth/me", { withCredentials: true })
      .then(res => {
        console.log({ res });
        props.setUser(res.data)
      }).catch(err => {
        console.log('hay un bug en PublicRoutes ---> ')
      })

  }, []);

  const handleCompra = (value) => {
    value.cantidad = Math.round(Math.random() * 10) + 1
    var oldCarro = [...carro, value]
    setCarro(oldCarro.filter((el, index) => oldCarro.indexOf(el) === index))
  };
  //S11 : Utilizar React Router en la App
  return (
    <div className="App" >
      <Route path="/">
        <AppBar />
      </Route>
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      {/* S49: Crear Ruta para admins */}
      {user.setUser && user.setUser.admin && (
        <Route exact path="/admin_ingreso">
          <AreaAdmin contenido={cats} />
        </Route>
      )}
      {user.setUser && (
        <Route exact path="/me" >
          <MiPerfil />
        </Route>
      )}
      {user.setUser && user.setUser.admin && (
        <Route exact path="/users/:id" >
          <DetalleUsuario />
        </Route>
      )}
      <Route exact path="/products">
        <Content contenido={cats} />
      </Route>
      {/* S15 : Crear Ruta para ver el detalle de un producto según el id. */}
      <Route exact path="/products/:idP" >
        <DetalleProducto />
      </Route>
      <Route exact path="/carrito">
        <Carrito carro={carro} />
      </Route>
      {!user.setUser && (
        <Route exact path="/ingresar">
          <LoginIngresar />
        </Route>
      )}
      {!user.setUser && (
        <Route exact path="/registrarse">
          <LoginRegistrarse />
        </Route>
      )}
      {user.setUser && (
        <Route exact path="/auth/passwordReset">
          <LoginCambioPassword />
        </Route>
      )}
      {user.setUser && (
        <Route exact path="/Ordenes">
          <Ordenes />
        </Route>
      )}
      {/*   <Route exact path="/Ordenes/Orden">
        <Orden />
      </Route>*/}
      {user.setUser && props.ordenes.especifica != '' && (
        <Route exact path="/Ordenes/Orden/:id" >
          <Orden />
        </Route>
      )}
      <Redirect path= "/**" to ="/products"/>
      </Switch>
    </div>
  )
}

const mapStateToProps = ({ categorias, productos, user, ordenes }) => ({
  categorias, productos, user, ordenes
})

const mapDispatchToProps = dispatch => ({
  addCategory: cat => dispatch(addCategory(cat)),
  addProduct: product => dispatch(addProduct(product)),
  addProductComentado: product => dispatch(addProductComentado(product)),
  setUser: (user) => dispatch(setUser(user)),
  addReview: r => dispatch(addReview(r))
  //Habria que poner el de ordenes tambien.
})

export default connect(mapStateToProps, mapDispatchToProps)(App)