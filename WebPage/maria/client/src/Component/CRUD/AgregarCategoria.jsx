import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux'
import { addCategory } from '../../store/actions/categorias'
import axios from 'axios'
import swal from 'sweetalert';


// S9 : Crear Formulario para creación de Categorías

function CategoryAdmin(props) {
  const [input, setInput] = useState({
    name: '',
    description: '',
  });
  const inputB = {
    name: '',
    description: '',
  };
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const submitCrud = function (e) {
    e.preventDefault();
    if (
      !input.name ||
      !input.description
    ) {
      swal("", "Deben completarse todos los campos!");
    } else {
      axios.post("http://localhost:4000/categories/", {
        name: input.name,
        description: input.description,
        active: true
      }, { withCredentials: true }).then((res) => {
        props.addCategory(res.data)
        swal("", "Categoria Añadida!");
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
              name='name'
              type='text'
              id="standard-full-width"
              label="Categoría"
              style={{ margin: 8 }}
              placeholder="Ingrese nombre de categoría"
              fullWidth
              value={input.name}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
            <TextField
              name='description'
              type='text'
              id="standard-full-width"
              label="Descripcion"
              style={{ margin: 8 }}
              value={input.description}
              placeholder="Describa la categoría"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />

            <div>
              <Button
                type="submit"
                variant="contained"
                align="left"
                size="medium"
                color="primary"
              >
                AGREGAR CATEGORÍA
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = ({ categorias }) => ({
  categorias
})

const mapDispatchToProps = dispatch => ({
  addCategory: cat => dispatch(addCategory(cat))
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdmin)