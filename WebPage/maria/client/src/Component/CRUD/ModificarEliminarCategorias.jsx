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
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import swal from 'sweetalert';
import axios from "axios";
import { connect } from 'react-redux'
import { removeCategory, editCategory } from '../../store/actions/categorias'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function ModificarEliminarCategorias(props) {
  const [input, setInput] = useState({
    name: "",
    description: ""
  });

  const [open, setOpen] = useState(false);
  const [modificarid, setModificarid] = useState('estado inicial');

  const setearModificarid = (row) => {
    setInput({ name: row.name, description: row.description });
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
    let confirmDelete = window.confirm("Confirme para eliminar la categoría");
    if (confirmDelete) {
      axios
        .put(`http://localhost:4000/categories/delete/${id}`)
        .then((item) => {
          props.removeCategory(id)
        })
        .catch((err) => console.log(err));
    }
  };

  const blank = { name: '', description: '' };
  const updateCat = function (e, id) {
    e.preventDefault();
    let confirmModificar = window.confirm("Confirme para modificar la categoría");
    if (confirmModificar) {
      axios.put(`http://localhost:4000/categories/${id}`, {
        name: input.name,
        description: input.description
      }, { withCredentials: true }).then(res => {
        props.editCategory({ name: input.name, description: input.description, id: id })
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
            <TableCell align="center">Categoría</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="center">Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.categorias.categorias.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center" component="th" scope="row"> {row.id} </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  color="primary"
                >
                  <Button size="small" onClick={() => setearModificarid(row)}>
                    Editar
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Modificar Categoria
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        name="name"
                        margin="dense"
                        label="Nueva Categoria"
                        type="text"
                        fullWidth
                        value={input.name}
                        onChange={handleSubmit}
                      />
                      <TextField
                        autoFocus
                        name="description"
                        margin="dense"
                        label="Describa la categoria"
                        type="text"
                        fullWidth
                        value={input.description}
                        onChange={handleSubmit}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cerrar
                      </Button>
                      <Button
                        type="submit"
                        onClick={(e) => updateCat(e, modificarid)}
                        color="primary"
                      >
                        Modificar
                      </Button>
                    </DialogActions>
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

const mapStateToProps = ({ categorias }) => ({
  categorias
})

const mapDispatchToProps = dispatch => ({
  removeCategory: cat => dispatch(removeCategory(cat)),
  editCategory: cat => dispatch(editCategory(cat))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModificarEliminarCategorias)