import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import axios from 'axios'
import { emphasize, withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import swal from 'sweetalert';


const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(5),
    margin: theme.spacing(2),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

function Checkout(props) {
  const [input, setInput] = useState({
    adress: '',
  });
  const inputB = {
    adress: '',
  };
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const submitCheckout = function (e) {
    e.preventDefault();
    if (
      !input.adress
    ) {
      swal("!", "Deben completarse todos los campos.");
    } else {
      axios.post("http://localhost:4000/adress/", {
        adress: input.adress,
      }, { withCredentials: true }).then((respuesta) => {
        alert("Su pedido esta en camino");
      }).catch((err) => err(err))
      };
      setInput(inputB);
    }
  return (
    <div>
      <div>
        <form onSubmit={submitCheckout}>
        <div>
        <h2>*"Estas a una dirección de disfrutar tu birra"*</h2>
        </div>
        <div>
        <StyledBreadcrumb
                  component="a"
                  label=""
                  icon={<EmojiEmotionsIcon fontSize="large" />}
                />
        </div>

          <div>
            <TextField
              name='adress'
              type='text'
              id="standard-full-width"
              label="Datos a completar"
              style={{ margin: 40 }}
              placeholder="Ingresa tu dirección"
              fullWidth
              value={input.adress}
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
                Finalizar pedido
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/*const mapStateToProps = ({ categorias }) => ({
  categorias
})

const mapDispatchToProps = dispatch => ({
  addCategory: cat => dispatch(addCategory(cat))
})*/

export default /*connect(mapStateToProps, mapDispatchToProps)*/(Checkout)