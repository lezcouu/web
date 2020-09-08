import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import "./DetalleProducto.css";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux'
import Review from './Review';
import TablaReviews from './TablaReviews';
import { addProductCart } from '../store/actions/carrito'
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginLeft: theme.spacing(85),
  },
}));

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function DetalleProducto(props) {
  const { user } = props;
  const [producto, setProducto] = useState({});
  const { idP } = useParams();
  const classes = useStyles();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:4000/products/${idP}`, { withCredentials: true })
      .then(res => {
        setProducto(res.data)
      });
  }, []);

  const handleRating = (event) => {
    setRating(event.target.value);
    console.log(rating);
  };

  const [input, setInput] = useState({
    description: "",
    qualification: ""
  });
  const [Comments, setComments] = useState([]);

  const inputB = {
    description: "",
    qualification: ""
  };
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const { name, price, id, stock } = producto;
  if (producto.stock) {
    return (
      <div className="body">
        <div id="container">
          <div className="product-details">
            <div className='botonCarrito'>
              <div>
                <IconButton onClick={e => props.addProductCart({ name, price, id, stock, cantidad: 1 })} color="primary" aria-label="add to shopping cart">
                  <AddShoppingCartIcon />
                </IconButton>
              </div>
              <div><h1>{producto.name}</h1></div>
            </div>
            <p className="information">"Las Birras mas Picantes De HENRY!"</p>
            <p className='information'>{producto.description}</p>
          </div>
          <div className="product-image">
            <img src={producto.picture} alt="Omar Dsoky" />
            <div className="info">
              <h2>Descripción</h2>
              <ul>
                <li>
                  <strong>Precio: </strong> ${producto.price}
                </li>
                <li>
                  <strong>Stock: </strong>{producto.stock}
                </li>
              </ul>
            </div>

          </div>

        </div>

        {!!props.reviews && (<Box textAlign="justify" component="fieldset" mb={3} borderColor="transparent">
        <Review />
        <TablaReviews />
        </Box>)}

      </div>
    )
  } else {
    return (
      <div className="body">
        <div id="container">
          <div className="product-details">

            <h1>{producto.name}</h1>
            <p className="information">"Las Birras mas Picantes De HENRY!"</p>
            <p>{producto.description}</p>


          </div>
          <div className="product-image">
            <img src={producto.picture} alt="Omar Dsoky" />
            <div className="info">
              <h2>Descripción</h2>
              <ul>
                <li>
                  <strong>Precio: </strong> ${producto.price}
                </li>
                <li>
                  <strong>Stock: </strong>{producto.stock}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {!!props.reviews && (<Box textAlign="justify" component="fieldset" mb={3} borderColor="transparent">
        <Review />
        <TablaReviews />
        </Box>)}

      </div>
    );
  }

}
const mapStateToProps = ({ user, producto, reviews }) => ({
  user,
  producto,
  reviews
})
const mapDispatchToProps = dispatch => ({
  addProductCart: product => dispatch(addProductCart(product))
})
export default connect(mapStateToProps, mapDispatchToProps)(DetalleProducto)

