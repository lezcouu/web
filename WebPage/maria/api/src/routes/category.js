const server = require('express').Router();
const { Product, Category } = require('../db.js');

//S18 : Crear ruta para crear/agregar Categoria
server.post('/', (req, res, next) => {
	const item = req.body;
	Category.create(item)
		.then((category => {
			return res.send(category)
		})).catch(err => next(err = 'error al cargar'));
});

// S19 : Crear Ruta para eliminar Categoria
server.put('/delete/:id', (req, res, next) => {
	const { id } = req.params;
	Category.update(
		{
			active: false,
		},
		{ where: { id } }
	).then((categoria) => {
		res.status(200).send(categoria);
	}).catch(err => next(400));
})


// S20 : Crear ruta para Modificar Categoria
server.put('/:id', (req, res, next) => {
	const catChange = req.params.id;
	const { name, description } = req.body;
	Category.update({
		name,
		description
	}, { where: { id: catChange } })
		.then(change => {
			res.sendStatus(200)
		}).catch(err => {
			next(err);
			res.status(400);
		})
})

//S22 : Crear Ruta que devuelva los productos de X categoria
server.get('/', (req, res, next) => {
	Category.findAll({
		include: Product,
		where: { active: true }
	})
		.then(categories => {
			res.send(categories);
		})
		.catch(next);
});

module.exports = server;
