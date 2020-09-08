import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux'
import { unaOrden, addOrden, quitarOrden } from '../store/actions/ordenes'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function SimpleTable(props) {
  const classes = useStyles();
  console.log(props.contenido)

  function probando(id) {
    axios.get(`http://localhost:4000/order/detalle/${id}`, { withCredentials: true })
      .then(res => {
        console.log('llegue')
        props.unaOrden(res.data)
        /* window.location.replace(`http://localhost:3000/Ordenes/Orden/${id}`); */
      }).catch(err => { console.log(err) })
  }
  function cancelar(id, orden) {
    axios.put(`http://localhost:4000/order/modificar/${id}/${'cancelada'}`, { withCredentials: true })
      .then(res => {
        props.quitarOrden(id)
        orden.status = 'cancelada'
        props.addOrden(orden)
      }).catch(err => { console.log(err) })
  }
  console.log(props.condicion)
  if (props.condicion) {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nº de orden</TableCell>
              <TableCell align="center">Creada</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.contenido.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>

                <TableCell align="center">{row.createdAt.split('T', 1)}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
                <TableCell align="center">
                  <ButtonGroup disableElevation variant="contained" color="primary">
                    <Link to={`/Ordenes/Orden/${row.id}`} style={{ textDecoration: 'none' }}>
                      <Button size="small" variant="contained" color="primary" style={{  borderRadius: '7px', marginTop: "0px", margin: "2px" }} onClick={e => probando(row.id)}>
                        detalles
                      </Button>
                    </Link>
                    <Button size="small"  style={{ borderRadius: '7px', margin: "2px" }} variant="contained" color="primary" onClick={e => cancelar(row.id, row)}>
                      Cancelar orden
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nº de orden</TableCell>
              <TableCell align="center">Creada</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.contenido.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>

                <TableCell align="center">{row.createdAt.split('T', 1)}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
                <TableCell align="center">
                  <Link to={`/Ordenes/Orden/${row.id}`} >
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      color="primary"                      
                    >
                      <Button size="small" onClick={e => probando(row.id)}>
                        {"detalles"}
                      </Button>
                    </ButtonGroup>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}


const mapStateToProps = ({ carrito, user, ordenes }) => ({
  carrito,
  user,
  ordenes
})
const mapDispatchToProps = dispatch => ({
  unaOrden: orden => dispatch(unaOrden(orden)),
  addOrden: orden => dispatch(addOrden(orden)),
  quitarOrden: id => dispatch(quitarOrden(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(SimpleTable)