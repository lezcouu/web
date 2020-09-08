import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux'
import axios from 'axios';
import { addOrden } from '../store/actions/ordenes'
import OrdenDetallada from "./OrdenDetallada.jsx";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function SimpleAccordion(props) {
  const classes = useStyles();

  useEffect(() => {
    axios.get(`http://localhost:4000/order/${props.user.setUser.id}`)
      .then(res => {
        /* console.log(res.data) */
        res.data.map(elem => {
          props.addOrden(elem)
        })
      });
  }, []);
  
  return (
    <div className={classes.root}>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Creadas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OrdenDetallada contenido={props.ordenes.creadas} condicion={true} cuales={'creadas'} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>En proceso</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OrdenDetallada contenido={props.ordenes.proceso} condicion={true} cuales={'proceso'} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Canceladas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OrdenDetallada contenido={props.ordenes.canceladas} condicion={false} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Completas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OrdenDetallada contenido={props.ordenes.completas} condicion={false} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const mapStateToProps = ({ carrito, user, ordenes }) => ({
  carrito,
  user,
  ordenes
})
const mapDispatchToProps = dispatch => ({
  addOrden: orden => dispatch(addOrden(orden))
})
export default connect(mapStateToProps, mapDispatchToProps)(SimpleAccordion)