const server = require('express').Router();
const passport = require('passport');
const crypto = require('crypto');
const { User, Carrito, Order } = require('../db.js');

// S34: Crear Ruta para creación de Usuario
server.post('/', (req, res, next) => {
    const user = req.body;
    User.create(user)
        .then((ans => {
            return res.send(ans)
        })).catch(err => next(err));
})

// S35: Crear Ruta para modificar usuario
server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { first_name, last_name, adress, email } = req.body;
    User.update(
        {
            first_name,
            last_name,
            adress,
            email
        },
        { where: { id } }
    ).then((usuario) => {
        res.status(200).send(usuario);
    }).catch(next);
});

// S36: Crear Ruta que retorne todos los Usuarios
server.get('/', (req, res, next) => {
    User.findAll()
        .then(usuarios => {
            res.send(usuarios);
        }).catch(next);
});

// Extra: Crear ruta de usuario individual, pasado un ID que retorne un producto con sus detalles
server.get('/:id', (req, res, next) => {
    const id = req.params.id;
    User.findByPk(id)
        .then((user) => {
            res.send(user);
        }).catch(next)
});

//S37: Crear Ruta para eliminar Usuario
server.put('/delete/:id', (req, res, next) => {
    const { id } = req.params; // Tambien podria ser asi: const id = req.params.id
    User.update(
        {
            active: false,
        },
        { where: { id } }
    ).then((usuario) => {
        res.status(200).send(usuario);
    }).catch(next);
})



//Extra: Crear Ruta para recuperar Usuario
server.put('/recovery/:id', (req, res, next) => {
    const { id } = req.params; // Tambien podria ser asi: const id = req.params.id
    User.update(
        {
            active: true,
        },
        { where: { id } }
    ).then((usuario) => {
        res.status(200).send(usuario);
    }).catch(next);
})

server.put('/:idUser/cart', (req, res, next) => { // La orderId esta asociada a un userId de user_order
    const { orderId } = req.params;// por lo que deberia modificar la cantidad de la orderId asociada al userId  
    const { cantidad } = req.body; //Porque si buscamos por userId van a aparecer todas las orderID
    Carrito.update(
        {
            cantidad,
        },
        { where: { orderId: orderId } } //ubicamos el orderId
    ).then((order) => {
        res.status(200).send(order);
    }).catch(next);
});

module.exports = server;