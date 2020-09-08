import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export default function DetalleUsuario() {
    const [usuario, setUsuario] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/users/${id}`)
            .then(res => {
                setUsuario(res.data)
            });
    }, []);

    return (
        <div>
            <Typography component="h1" variant="h5"> Detalles del usuario </Typography>
            <TextField autoFocus name="name" margin="normal" label="ID del usuario" type="text" fullWidth defaultValue={usuario.id} value={usuario.id} InputLabelProps={{ shrink: true, }} />
            <TextField autoFocus name="name" margin="normal" label="Nombre" type="text" fullWidth value={usuario.first_name} InputLabelProps={{ shrink: true, }} />
            <TextField autoFocus name="name" margin="normal" label="Apellido" type="text" fullWidth value={usuario.last_name} InputLabelProps={{ shrink: true, }} />
            <TextField autoFocus name="name" margin="normal" label="Direccion" type="text" fullWidth value={usuario.adress} InputLabelProps={{ shrink: true, }} />
            <TextField autoFocus name="name" margin="normal" label="email" type="text" fullWidth value={usuario.email} InputLabelProps={{ shrink: true, }} />
        </div>
    );
}