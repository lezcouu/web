import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import { connect } from 'react-redux'
import { addReview } from '../store/actions/reviews'
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function TablaReviews(props) {

  const classes = useStyles();
  const { idP } = useParams();
  const { width } = props;

  let columns = width === 'xs' || width === 'sm' ? 1 : 2;

  /* useEffect(() => {
      axios.get(`http://localhost:4000/products/${id}/review`).then((response) => {
          response.data.map(elem=>{
            props.addReview(elem)
          })
      });
  }, []); */

  return (
    <div id="container3">
      <Box textAlign="justify" fontWeight="fontWeightBold" fontStyle="oblique" component="fieldset" mb={3} borderColor="transparent">
        <GridList className={classes.gridList} cellHeight={220} cols={columns}>
          <List className={classes.root}>
            <Typography gutterBottom variant="h6" textAlign="center" fontWeight="fontWeightBold" fontStyle="oblique" component="AlignItemsList">
              Comentarios
            <Divider component="li" />
            </Typography>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <React.Fragment>
                    {props.reviews.reviews.filter(elem => elem.productId == idP) &&
                      props.reviews.reviews.filter(elem => elem.productId == idP).map((row) => (
                        <TableRow key={row.name}>
                          <Grid item>
                            <ButtonGroup>
                              {props.user.setUser && props.user.setUser.id == row.userId &&(<IconButton aria-label="delete" className={classes.margin} onClick={e => console.log('BORRA') /* props.eliminarProducto(row) */}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>)}
                              {props.user.setUser && props.user.setUser.id == row.userId &&(<IconButton aria-label="delete" className={classes.margin} onClick={e => console.log('BORRA')/* props.eliminarProducto(row) */}>
                                <EditIcon fontSize="small" />
                              </IconButton>)}
                            </ButtonGroup>
                            {props.producto.productosComentados.length != 0
                              && props.producto.productosComentados.filter(elem => elem.id == idP).length != 0
                              && props.producto.productosComentados.filter(elem => elem.id == idP)[0].reviews.filter(rev => rev.userId == row.userId).length != 0
                              && (
                                <Typography color="textSecondary" textAlign="center" fontWeight="fontWeightBold" component="AlignItemsList" scope="row">
                                  {props.producto.productosComentados.filter(elem => elem.id == idP)[0].reviews.filter(rev => rev.userId == row.userId)[0].user.first_name}
                                </Typography>)}

                            {props.producto.productosComentados.length != 0
                              && props.producto.productosComentados.filter(elem => elem.id == idP).length != 0
                              && props.producto.productosComentados.filter(elem => elem.id == idP)[0].reviews.filter(rev => rev.userId == row.userId).length != 0
                              && (
                                <Typography color="textSecondary" textAlign="center" fontWeight="fontWeightBold" component="AlignItemsList" scope="row">
                                  {props.producto.productosComentados.filter(elem => elem.id == idP)[0].reviews.filter(rev => rev.userId == row.userId)[0].createdAt.split('T', 1)}
                                </Typography>)}

                          </Grid>
                          <Divider></Divider>
                          <TableRow key={row.description}>
                            <Typography color="textprimary" textAlign="center" >{row.description}
                              <Box component="fieldset" mb={3} borderColor="transparent">
                                <Rating name="half-rating-read" precision={0.5} value={row.qualification} size="small" readOnly />
                              </Box>
                            </Typography>
                          </TableRow>
                        </TableRow>
                      ))}
                  </React.Fragment>
                }
              />
              <Divider variant="middle" component="li" />
            </ListItem>
          </List>
        </GridList>
      </Box>
    </div>
  );
}

const mapStateToProps = ({ reviews, producto, user }) => ({
  reviews,
  producto,
  user
})

const mapDispatchToProps = dispatch => ({
  addReview: review => dispatch(addReview(review)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TablaReviews)