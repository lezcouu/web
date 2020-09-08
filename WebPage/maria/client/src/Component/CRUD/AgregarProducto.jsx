import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SeleccionCategorias from './SeleccionCategorias.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { addProduct } from '../../store/actions/producto';
import swal from 'sweetalert';



function ProductAdmin(props) {
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    picture: "",
  });
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const handleChange = (event) => {
    const values = event.target.value;
    setCategoriesSelected(values);
  };

  const inputB = {
    name: "",
    description: "",
    price: "",
    stock: "",
    picture: "",
  };
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitCrud = function (e) {
    e.preventDefault();
    if (
      !input.name ||
      !input.description ||
      !input.price ||
      !input.stock ||
      !input.picture
    ) {
      swal("", "Deben completarse todos los campos!");
    } else {
      axios.post("http://localhost:4000/products/", {
        name: input.name,
        description: input.description,
        price: input.price,
        stock: input.stock,
        picture: input.picture,
        active: true,
        categories: categoriesSelected.reduce((total, current) => [...total, current.id], []),
      }, { withCredentials: true }).then((res) => {
        props.addProduct(res.data)
        swal("", "Producto Añadido!");
      }).catch((err) => {
        alert(err);
      });
      setInput(inputB);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={submitCrud}>
          <div>
            <TextField
              name="name"
              type="text"
              id="standard-full-width"
              label="Producto"
              style={{ margin: 8 }}
              placeholder="Ingrese Producto"
              fullWidth
              value={input.name}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
            <TextField
              name="description"
              type="text"
              id="standard-full-width"
              label="Descripcion"
              style={{ margin: 8 }}
              value={input.description}
              placeholder="Describa su Producto"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
            <TextField
              name="price"
              type="text"
              id="standard-full-width"
              label="Precio"
              style={{ margin: 8 }}
              value={input.price}
              placeholder="Costo por Unidad"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
            <TextField
              name="stock"
              type="text"
              id="standard-full-width"
              label="Stock"
              style={{ margin: 8 }}
              value={input.stock}
              placeholder="Cantidad del producto"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
            <TextField
              name="picture"
              type="text"
              id="standard-full-width"
              label="Imagen"
              style={{ margin: 8 }}
              value={input.picture}
              placeholder="Ingrese Url"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
            <SeleccionCategorias contenido={props.contenido} catName={categoriesSelected} handleChange={handleChange} />
            <div>
              <Button
                type="submit"
                variant="contained"
                align="left"
                size="medium"
                color="primary"
              >
                AGREGAR PRODUCTO
              </Button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = ({ producto }) => ({
  producto
})

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProduct(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdmin)
