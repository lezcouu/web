import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useParams } from "react-router";
import axios from 'axios';
import { connect } from 'react-redux'

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

 function SpanningTable(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [items, setItems] = useState([]);
  

console.log(props.ordenes.especifica[0].carritos[0])
console.log('AAAAA')
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Creada el {props.ordenes.especifica[0].createdAt.split('T', 1)}
            </TableCell>
            
          </TableRow>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio unitario</TableCell>
            <TableCell align="right">Suma</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.ordenes.especifica[0].carritos.map((row) => (
            <TableRow key={row.productId}>
              <TableCell>{props.producto.productos.filter(elem=>elem.id == row.productId)[0].name}</TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
              <TableCell align="right">{row.precio}</TableCell>
              <TableCell align="right">{row.precio * row.cantidad}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3}>Total (Recargos aplicados)</TableCell>
            <TableCell align="right">{props.ordenes.especifica[0].total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = ({ ordenes, producto }) => ({
  ordenes, producto
})

export default connect(mapStateToProps, null)(SpanningTable)