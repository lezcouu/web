const server = require('express').Router();
const { Product, Category, category_product, Reviews, User } = require('../db.js');
const { Sequelize } = require('sequelize');

//S17 : Crear ruta para agregar o sacar categorias de un producto.
server.post('/:idP/category/:idC', (req, res, next) => {
	idP = req.params.idP
	idC = req.params.idC
	category_product.create({ categoryId: idC, productId: idP })
		.then((product => {
			res.status(200)
		})).catch(err => next(err));
})

server.delete('/:idP/category/:idC', (req, res, next) => {
	idP = req.params.idP
	idC = req.params.idC
	category_product.destroy({
		where: {
			categoryId: idC,
			productId: idP
		}
	})
		.then((product => {
			res.status(200)
		})).catch(err => next('Error 404'));
})

// S21: Crear una ruta que devuelva todos los productos
server.get('/', (req, res, next) => {
	Product.findAll({
		include: [Category, Reviews],
		where: {
			active: true
		}
	})
		.then(products => {
			res.send(products);
		}).catch(err => {
			next(err)
		});
});

server.get('/junior', (req, res, next) => {
	Product.findAll({
		include: [{ model: Category, model: Reviews, include: [{ model: User }] }],
		where: {
			active: true
		}
	})
		.then(products => {
			res.send(products);
		}).catch(next);
});

//S23 : Crear ruta que retorne productos segun el keyword de búsqueda
server.get('/search', (req, res, next) => {
	const { query } = req.query
	Product.findAll({
		where: {
			[Op.or]: { name: { [Op.ilike]: `%${query}` }, description: { [Op.ilike]: `%${query}` } }
		}
	})
		.then((product) => {
			console.log(product)
			res.send(product);
		}).catch(next)

	if (!query) return res.send("Busca Otra Capo!!");
});

// S24: Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles
server.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Product.findByPk(id, { include: Category })
		.then(product => {
			res.status(200);
			res.send(product)
		}).catch(next)
});

//S25 : Crear ruta para crear/agregar Producto
server.post('/', (req, res, next) => {
	const item = req.body;
	/* console.log({ item }) */
	Product.create(item)
		.then((product => {
			const categoriesId = item.categories;
			categoriesId.forEach(categoryId => {
				Category.findOne({
					where: { id: categoryId },
				}).then(result => {
					product.addCategory(result);
				})
			})
			return res.status(201).send(product)
		})).catch(err => next('Error 404'));
});

// S26 : Crear ruta para Modificar Producto
server.put('/:id', (req, res, next) => {
	const { id } = req.params;
	const { name, description, price, stock, picture } = req.body;
	Product.update(
		{
			name,
			description,
			price,
			stock,
			picture,
		},
		{ where: { id } }
	).then((producto) => {
		/* console.log(response); */
		res.status(200).send(producto);
	}).catch(err => next(400));
})



// S27 : Crear Ruta para eliminar Producto
server.put('/delete/:id', (req, res, next) => {
	const { id } = req.params;
	Product.update(
		{
			active: false,
		},
		{ where: { id } }
	).then(producto => {
		res.status(200)
	}).catch(err => next(400));
})

//S54 : Crear ruta para crear/agregar Review
//POST /product/:id/review
//Crear ruta para crear/agregar Review


server.post('/:userId/review', (req, res, next) => {
	Reviews.create({
		description: req.body.description,
		qualification: req.body.qualification,
		productId: req.body.productId,
		userId: req.params.userId
	}).then(reviews => {
		res.status(200).send(reviews);
	}).catch(next);
})
/*S55-Crear-ruta-para-Modificar-Review
PUT /product/:id/review/:idReview
    Id del review/ review*/
server.put('/:id/review/', (req, res, next) => {
	Reviews.update({
		description: req.body.description,
		qualification: req.body.qualification
	}, {
		where: { id: req.params.id }
	}).then(actualizacion => {
		res.status(200).send(actualizacion)
	}).catch(next)
})

/*S57Crear-Ruta-para-obtener-todas-las-reviews-de-un-producto
GET /product/:id/review/
Podés tener esta ruta, o directamente obtener todas las reviews en la ruta de GET product.*/
server.get('/:id/review', (req, res, next) => {
	Reviews.findAll({
		where: { productId: req.params.id },
		include: User
	})
		.then(usuarios => {
			res.send(usuarios);
		}).catch(err => {
			next(err)
		});
});

/*S56 : Crear Ruta para eliminar Review
DELETE /product/:id/review/:idReview*/
server.delete('/:id/review', (req, res, next) => {
	const { id } = req.params;
	Reviews.destroy({

		where: { id: id }

	}).then(review => {
		res.sendStatus(200).send(review);
	}).catch(err => next("su review no existe"));
});

//Rutas promedio reviews;

server.get('/:id/average', (req, res, next) => {
	Product.findOne({
		where: { id: req.params.id },
		attributes: ['name'],
		include: [{ model: Reviews, attributes: [[Sequelize.fn('AVG', Sequelize.col('qualification')), 'qualification']] }],
		group: ['product.id', 'reviews.id']
	}).then(response => {
		res.send(response)
	}).catch(err => {
		console.log(err)
	})
});

module.exports = server;
