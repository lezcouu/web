import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import './ProductCard.css';
import { connect } from 'react-redux'
import { addProductCart } from '../store/actions/carrito'
import { addProductCartButton, deleteProductCartButton } from '../store/actions/producto';
import axios from 'axios';
import { addReview } from '../store/actions/reviews'


// S10 : Crear Componente ProductCard
// const CSimpleRating = CSimpleRating();


const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    heigth: 380,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textDecoration: 'none',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  media: {
    height: 200,
    width: 200,
  },
  contenido: {
    height: 150,
  },
  nombre: {
    height: 100,
  },
  sinStock: {
    height: 44,
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    textTransform: "none"
  },
  button: {
    textTransform: "none",
  },
}));


function ProductCard(props) {
  const { image, name, price, ml, id, stock, avg, handleCompra } = props
  const classes = useStyles();

function buscar(id){
  axios.get(`http://localhost:4000/products/${id}/review`)
  .then((response) => {
            response.data.map(elem=>{
              props.addReview(elem)
            })
        })
}
  if (stock) {
    return (
      <div className='contenedortarjeta'>
        <Card className={classes.root} onClick={e=>buscar(id)}>
          <Link style={{ textDecoration: 'none' }} to={`/products/${id}`} >
            <div>
              <CardActionArea>
                <CardMedia className={classes.media} image={image} />
                <CardContent className={classes.contenido}>
                  <Typography className={classes.nombre} gutterBottom variant="h5" component="h2">
                    {name}
                  </Typography>

                  <Typography variant="body2" color="text.primary" component="p">
                    Precio: $ {price}
                  </Typography >
                </CardContent>
                <div className={classes.root}>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="read-only" precision={0.5} value={avg} readOnly />
                  </Box>
                </div>
              </CardActionArea>
            </div>
          </Link>
          <CardActions>
            <AddShoppingCartIcon color="primary" fontSize="medium" />
            <Button disabled={props.producto.verdad} variant="contained" size="medium" color="primary" onClick={e => props.addProductCart({ name, price, id, stock, cantidad: 1 }) && props.addProductCartButton()}>
              Añadir
            </Button>
          </CardActions>
        </Card >
      </div>
    );
  } else {
    return (
      <Card className={classes.root}>
        <Link to={`/products/${id}`} style={{ textDecoration: 'none' }}>
          <div>
            <CardActionArea>
              <CardMedia className={classes.media} image={image} />
              <CardContent className={classes.contenido}>
                <Typography className={classes.nombre} gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography variant="body2" color="text.primary" component="p">
                  Precio: $ {price}
                </Typography>
              </CardContent>
              <div className={classes.root}>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating name="half-rating-read" precision={0.5} value={avg} readOnly />
                </Box>
              </div>
            </CardActionArea>
          </div>
        </Link>
        <Typography className={classes.sinStock} gutterBottom variant="h5" component="h2">
          No disponible
        </Typography>
      </Card >
    )
  }
}


/* 
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Read only</Typography>
        <Rating name="read-only" value={value} readOnly />
      </Box>
    </div>
  ); */


const mapStateToProps = ({ test, carrito, producto }) => ({
  test, carrito, producto
})

const mapDispatchToProps = dispatch => ({
  addProductCart: product => dispatch(addProductCart(product)),
  addProductCartButton: () => dispatch(addProductCartButton()),
  deleteProductCartButton: () => dispatch(deleteProductCartButton()),
  addReview: review => dispatch(addReview(review))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)