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
import { Link } from 'react-router-dom';
import axios from "axios";
import swal from 'sweetalert';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function ModificarEliminarUsuario() {
    const [user, setUser] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const actividadUsuario = (actividadUsuario) => {
        if (actividadUsuario) { return 'SI' }
        else { return 'NO' }
    }

    useEffect(() => {
        axios.get("http://localhost:4000/users").then((response) => {
            setUser(response.data);
            console.log(response.data)
        });
    }, []);

    const userDelete = function (e, id) {
        e.preventDefault();
        let confirmDelete = window.confirm('Eliminar Usuario?');
        if (confirmDelete) {
            axios.put(`http://localhost:4000/users/delete/${id}`)
                .then((item) => {
                    swal("", "Usuario Eliminado!");
                })
                .catch((err) => console.log(err));
        }
    };

    const userActive = function (e, id) {
        e.preventDefault();
        let confirmActive = window.confirm('Restaurar Usuario?');
        if (confirmActive) {
            axios.put(`http://localhost:4000/users/recovery/${id}`)
                .then((item) => {
                    swal("","Usuario Restaurado!");
                })
                .catch((err) => console.log(err));
        }
    };

    const userPromove = function (e, id) {
        e.preventDefault();
        let confirmActive = window.confirm('Promover a usuario?');
        if (confirmActive) {
            axios.put(`http://localhost:4000/auth/promote/${id}`)
                .then((item) => {
                    swal("", "Usuario promovido!");
                })
                .catch((err) => console.log(err));
        }
    };
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Nombre del Usuario</TableCell>
                        <TableCell align="center">email</TableCell>                        
                        <TableCell align="center">Opciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {user.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="center" component="th" scope="row"> {row.id} </TableCell>
                            <TableCell align="center">{row.first_name} {row.last_name}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            {/* <TableCell align="center"> {actividadUsuario(row.active)} </TableCell> */}
                            <TableCell align="center">

                                <ButtonGroup disableElevation variant="contained" color="primary">
                                    <Link style={{ textDecoration: 'none' }} to={`/users/${row.id}`}>
                                        <Button style={{ textDecoration: 'none' }} color="primary" variant="contained" size="small" onClick={handleClickOpen}> INFO </Button>
                                    </Link>
                                    {row.active
                                        ? <Button style={{ textDecoration: 'none' }} size="small" onClick={(e) => userDelete(e, row.id)}> Eliminar</Button>
                                        : <Button style={{ textDecoration: 'none' }} size="small" onClick={(e) => userActive(e, row.id)}> Recuperar</Button>}
                                    {row.admin
                                        ? <Button style={{ textDecoration: 'none' }} size="small" disabled> Promover</Button>
                                        : <Button style={{ textDecoration: 'none' }} size="small" onClick={(e) => userPromove(e, row.id)}> Promover</Button>}

                                </ButtonGroup>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
