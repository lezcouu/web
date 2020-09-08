import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AgregarProducto from './AgregarProducto.jsx'
import AgregarCategoria from './AgregarCategoria.jsx'
import ModificarEliminarProducto from './ModificarEliminarProducto.jsx'
import ModificarEliminarCategorias from './ModificarEliminarCategorias.jsx'
import ModificarOrden from './ModificarOrden.jsx'
import EdicionCategoriaProducto from './EdicionCategoriaProducto.jsx'
import UsuariosAdmin from './UsuariosAdmin.jsx'

// S8 : Crear Formulario para el CRUD de un Producto

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Agregar producto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AgregarProducto contenido={props.contenido} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Modificar o eliminar productos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ModificarEliminarProducto />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Agregar categoría</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AgregarCategoria />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Modificar o eliminar categorías</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ModificarEliminarCategorias contenido={props.contenido} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Editar categoria-producto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EdicionCategoriaProducto contenido={props.contenido} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Ordenes </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ModificarOrden />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Administrar usuarios</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <UsuariosAdmin />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}