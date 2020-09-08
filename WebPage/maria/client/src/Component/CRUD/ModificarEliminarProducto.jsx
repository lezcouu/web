import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { connect } from 'react-redux'
import { removeProduct, editProduct } from '../../store/actions/producto'
import swal from 'sweetalert';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function ModificarEliminarProducto(props) {
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    picture: "",
  });

  const [open, setOpen] = useState(false);
  const [modificarid, setModificarid] = useState('estado inicial');

  const setearModificarid = (row) => {
    setInput({
      name: row.name,
      description: row.description,
      price: row.price,
      stock: row.stock,
      picture: row.picture,
    });
    setOpen(true);
    setModificarid(row.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const dataDelete = function (e, id) {
    e.preventDefault();
    let confirmDelete = window.confirm('Confirme para eliminar el producto');
    if (confirmDelete) {
      axios.put(`http://localhost:4000/products/delete/${id}`)
        .then((item) => {
          swal("", "Producto Eliminado!");
          props.removeProduct(id)
        })
        .catch((err) => console.log(err));
    }
  };

  const blank = { name: "", description: "", price: "", stock: "", picture: "" };
  const updateProd = function (e, id) {
    e.preventDefault();
    let confirmModificar = window.confirm("Confirme para modificar el producto");
    if (confirmModificar) {
      axios.put(`http://localhost:4000/products/${id}`, {
        name: input.name,
        description: input.description,
        price: input.price,
        stock: input.stock,
        picture: input.picture,
        active: true,
      }, { withCredentials: true }).then(res => {
        props.editProduct({ name: input.name, description: input.description, price: input.price, stock: input.stock, picture: input.picture, id: id, active: true })
      }).catch(err => {
        swal("", "Rellene los Campos!");
      });
    }
    setInput(blank);
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Producto</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="center">Precio X UND</TableCell>
            <TableCell align="center">Stock</TableCell>
            <TableCell align="center"> Imagen </TableCell>
            <TableCell align="center">Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.producto.productos.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center" >{row.description} </TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.stock}</TableCell>
              <TableCell align="center">
                <Avatar src={row.picture} />
              </TableCell>
              <TableCell align="right">
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  color="primary"
                >
                  <Button size="small" onClick={() => setearModificarid(row)} >
                    Editar
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Modificar Producto
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        name="name"
                        margin="dense"
                        label="Nuevo Producto"
                        type="text"
                        fullWidth
                        value={input.name}
                        onChange={handleSubmit}
                      />
                      <TextField
                        autoFocus
                        name="description"
                        margin="dense"
                        label="Descripcion"
                        type="text"
                        fullWidth
                        value={input.description}
                        onChange={handleSubmit}
                      />
                      <TextField
                        autoFocus
                        name="price"
                        margin="dense"
                        label="Precio X Und"
                        type="text"
                        fullWidth
                        value={input.price}
                        onChange={handleSubmit}
                      />
                      <TextField
                        autoFocus
                        name="stock"
                        margin="dense"
                        label="Cantidad"
                        type="text"
                        fullWidth
                        value={input.stock}
                        onChange={handleSubmit}
                      />
                      <TextField
                        autoFocus
                        name="picture"
                        margin="dense"
                        label="Imagen"
                        type="text"
                        fullWidth
                        value={input.picture}
                        onChange={handleSubmit}
                      />
                    </DialogContent>
                    <div style={{ margin: 8 }}>
                      <DialogActions >
                        <Button onClick={handleClose} color="primary">
                          Cerrar
                      </Button>
                        <Button
                          type="submit"
                          onClick={(e) => updateProd(e, modificarid)}
                          color="primary"
                        >
                          Modificar
                      </Button>
                      </DialogActions>
                    </div>
                  </Dialog>
                  <Button size="small" onClick={(e) => dataDelete(e, row.id)}>
                    Eliminar
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const mapStateToProps = ({ producto }) => ({
  producto
})

const mapDispatchToProps = dispatch => ({
  removeProduct: product => dispatch(removeProduct(product)),
  editProduct: product => dispatch(editProduct(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModificarEliminarProducto)