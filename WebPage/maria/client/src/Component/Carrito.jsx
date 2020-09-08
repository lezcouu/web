import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './Carrito.css'
import { connect } from 'react-redux'
import { vaciarCarrito } from '../store/actions/carrito'
import { incrementarCantidad } from '../store/actions/carrito'
import { decrementarCantidad } from '../store/actions/carrito'
import { eliminarProducto } from '../store/actions/carrito'
import swal from 'sweetalert';


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function SpanningTable(props) {
  const classes = useStyles();

  function confirmarCompra(carrito, usuario) {


    if (props.user.setUser) {
      // carrito.map(elem => {
      fetch(`http://localhost:4000/order/${usuario.id}/cart`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'creada',
          userId: usuario.id,
          carrito: carrito,
          total: props.carrito.suma + props.carrito.suma * 10 / 100         
        })
      })
        .then(res => {
          console.log(res)
          swal("", "Orden enviada!")
        })
        .catch(err => {
          alert(err)
        });
      // })
    } else {
      swal("", "Debe iniciar sesión para realizar compras!");
    }


  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Carrito
            </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Precio unitario</TableCell>
              <TableCell align="center">Suma</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.carrito.productAdded.map((row) => (
              <TableRow key={row.desc}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">
                  <ButtonGroup>
                    <IconButton aria-label="delete" className={classes.margin} onClick={e => props.eliminarProducto(row)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <Button onClick={e => props.decrementarCantidad(row)}>-</Button>
                    <Button disabled>{row.cantidad}</Button>
                    <Button onClick={e => props.incrementarCantidad(row)}>+</Button>
                  </ButtonGroup>
                </TableCell>

                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.cantidad * row.price}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="center">{props.carrito.suma}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Impuestos</TableCell>
              <TableCell align="center">{`5%`}</TableCell>
              <TableCell align="center">{props.carrito.suma * 5 / 100}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell align="center" colSpan={3}>{props.carrito.suma + props.carrito.suma * 10 / 100}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button className={classes.margin} style={{  marginTop: "0px", margin: "10px" }} variant="contained" color="primary" size="medium" onClick={e => props.vaciarCarrito()}>
          Vaciar Carrito
        </Button>
        <Button className={classes.margin} variant="contained" color="primary" size="medium" onClick={(e) => props.vaciarCarrito() && confirmarCompra(props.carrito.productAdded, props.user.setUser)} >
          Confirmar compra
        </Button>
      </TableContainer>
    </div>
  );
}

const mapStateToProps = ({ carrito, user }) => ({
  carrito,
  user
})

const mapDispatchToProps = dispatch => ({
  vaciarCarrito: () => dispatch(vaciarCarrito()),
  incrementarCantidad: row => dispatch(incrementarCantidad(row)),
  decrementarCantidad: row => dispatch(decrementarCantidad(row)),
  eliminarProducto: row => dispatch(eliminarProducto(row))
})

export default connect(mapStateToProps, mapDispatchToProps)(SpanningTable)