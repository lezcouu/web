import React, { useState, useEffect } from "react";
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
import axios from "axios";
import SeleccionCategorias from './SeleccionCategorias.jsx'
import swal from 'sweetalert';


//S16 : Agregar al formulario de Productos las categorías del mismo.

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function CustomizedTables(props) {
  const [product, setProduct] = useState([]);
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    picture: "",
  });
  const [open, setOpen] = useState(false);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const handleChange = (event) => {
    const values = event.target.value;
    setCategoriesSelected(values);
  };
  const handleClickOpen = () => {
    setOpen(true);
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

  useEffect(() => {
    axios.get("http://localhost:4000/products").then((response) => {
      setProduct(response.data);
    });
  }, []);

  const dataDelete = function (e, id) {
    e.preventDefault();
    let confirmDelete = window.confirm('Eliminar Producto?');
    if (confirmDelete) {
      axios.put(`http://localhost:4000/products/delete/${id}`)
        .then((item) => {
          swal("", "Producto Eliminado!");
        })
        .catch((err) => console.log(err));
    }
  };
  const handleAgregar = function (e, id) {
    e.preventDefault();
  
    const categorias = categoriesSelected.reduce((total, current) => [...total, current.id], [])
    categorias.map(categoria => {
      axios.post(`http://localhost:4000/products/${id}/category/${categoria}`)
        .then((item) => {
          if (categorias.length < 2) {
            swal("", 'Categoría añadida!')
          } else {
            swal("", 'Categorías añadidas!')
          }
        })
        .catch((err) => console.log(err))
    })
  };
  const handleEliminar = function (e, id) {
    e.preventDefault();
    
    const categorias = categoriesSelected.reduce((total, current) => [...total, current.id], [])
    categorias.map(categoria => {
      axios.delete(`http://localhost:4000/products/${id}/category/${categoria}`)
        .then((item) => {
          if (categorias.length < 2) {
            swal("", 'Categoría añadida!')
          } else {
            swal("", 'Categorías añadidas!')
          }
        })
        .catch((err) => console.log(err))
    })
  };
  const handleRemover = function (e, id) {
    e.preventDefault();
    axios.put(`http://localhost:4000/products/delete/${id}`)
      .then((item) => {
        swal("", "Producto Eliminado!");
      })
      .catch((err) => console.log(err));
  };

  const blank = { name: "", description: "", price: "", stock: "", picture: "" };
  const updateProd = function (e, id) {
    e.preventDefault();
    axios.put(`http://localhost:4000/products/${id}`, {
      name: input.name,
      description: input.description,
      price: input.price,
      stock: input.stock,
      picture: input.picture,
      active: true,
    }).then(res => {
      swal("", "Producto Modificado!");
    }).catch(err => {
      swal("", 'Rellene los Campos!')
    });
    setInput(blank);
  };

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Producto</TableCell>
            <TableCell align="center">Descripcion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">
                <SeleccionCategorias contenido={props.contenido} catName={categoriesSelected} handleChange={handleChange} />
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  color="primary"                >
                  <Button size="small" onClick={(e) => handleAgregar(e, row.id)}>
                    Agregar
                  </Button>
                  <Button size="small" onClick={(e) => handleEliminar(e, row.id)}>
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