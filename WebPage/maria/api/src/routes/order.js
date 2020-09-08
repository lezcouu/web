const server = require('express').Router();
const { Order, Carrito, Product, User } = require('../db.js');

server.get('/bystatus/:status', (req, res, next) => {
    const { status } = req.params;
    Order.findAll({
        where: {
            status: status
        }
    }).then(response => {
        res.send(response)
        res.status(200)
    }).catch(err => {
        next(err)
    }
    )
});
server.get('/:id', (req, res, next) => {
    const id = req.params.id
    Order.findAll({
        where: {
            userId: id
        }
    }).then(response => {
        res.send(response)
    }).catch(err => {
        next(err)
    })
});
// S45: Crear Ruta que retorne todas las Ordenes de los usuarios
server.get('/', (req, res, next) => {
    Carrito.findAll()
        .then(carrito => {
            res.send(carrito);
        }).catch(next);
});

// S45: Crear Ruta que retorne todas las Ordenes de los usuarios
server.get('/todas/ordenes', (req, res, next) => {
    Order.findAll({ include: User })
        .then(ordenes => {
            res.send(ordenes);
        }).catch(next);
});

// S46: Crear Ruta que retorne una orden en particular.

server.get('/detalle/:id', (req, res, next) => {
    Order.findAll({
        where: { id: req.params.id },
        include: {
            model: Carrito,
            include: {
                model: Product
            }
        }
    })
        .then(obj => {
            res.send(obj)
        })
        .catch(next)
});

    server.put('/modificar/:id/:status/', (req, res, next) => {
        Order.update({
            status: req.params.status
        }, {
            where: { id: req.params.id }
        }).then(actualizacion => {
            res.status(200).send(actualizacion)
        }).catch(next)
    })

// S47: Crear Ruta para modificar una Orden  REVISAAAAR
// server.put('/:orderId', (req, res, next) => {
//     const { orderId } = req.params;
//     const { precio, cantidad } = req.body;
//     Carrito.update(
//         {
//             precio,
//             cantidad,
//         },
//         { where: { orderId: orderId } }
//     ).then((order) => {
//         res.status(200).send(order);
//     }).catch(next);
// });


server.post('/', (req, res, next) => {
    Order.create({
        status: req.body.status
    })
        .then(response => {
            res.send(response)
        }).catch(err =>
            next(err))
});

//S38 : Crear Ruta para agregar Item al Carrito
server.post('/:userId/cart', (req, res, next) => {
    const userId = req.params.userId
    const carrito = req.body.carrito
    const status = req.body.status
    const total = req.body.total
    Order.create({
        status: status,
        userId: userId,
        total: total
    }).then(response => {
        const orderId = response.dataValues.id
        carrito.map(elem => {
            Carrito.create({
                cantidad: elem.cantidad,
                precio: elem.price,
                productId: elem.id,
                orderId: orderId
            }).then(secondResponse => {
                const cant = secondResponse.dataValues.cantidad
                const prodId = secondResponse.dataValues.productId
                Product.decrement(
                    {
                        stock: cant
                    },
                    { where: { id: prodId } }
                ).then(thirdResponse => {
                    res.send(thirdResponse)
                }).catch(err => {
                    console.log(err)
                })
            })
        })
    })
});

server.put('/modificar/:id/:status/', (req, res, next) => {
    Order.update({
        status: req.params.status
    }, {
        where: { id: req.params.id }
    }).then(actualizacion => {
        res.send(actualizacion)
        res.status(200)
    }).catch(next)
})


module.exports = server;