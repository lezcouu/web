import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';
import { ordenDetalle } from '../../store/actions/ordenes';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function ModificarOrden(props) {
  const classes = useStyles();
  const ordenes = props.ordenes.ordenDetalle;

  useEffect(() => {
    axios.get('http://localhost:4000/order/todas/ordenes')
      .then(res => {
        props.ordenDetalle(res.data)
      }).catch(err => {
        console.log(err)
      })
  }, []);
  
  return (
    <div><TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nº de orden</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Usuario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordenes && ordenes.map((e) => (
            <TableRow key={e.id}>
              <TableCell align="center">{e.id} </TableCell>
              <TableCell align="center">{e.status}</TableCell>
              <TableCell align="center">{e.total}</TableCell>
              <TableCell align="center">{e.user.first_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

const mapStateToProps = ({ carrito, user, ordenes }) => ({
  carrito,
  user,
  ordenes
})
const mapDispatchToProps = dispatch => ({
  ordenDetalle: detalles => dispatch(ordenDetalle(detalles))
})
export default connect(mapStateToProps, mapDispatchToProps)(ModificarOrden)