const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
//const cors = require('cors');
const json = require('express');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const { Product, Category, User } = require('./db.js');
const server = express();
const session = require("express-session");
const passport = require('passport');
server.name = 'API';

const product = require('./routes/product');
const categories = require("./routes/category")

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.

// PASO 1 - CREAR ESTRATEGIA

// SIGUIENDO LA DOCUMENTACION
passport.use(new LocalStrategy({
  // El primer parametro es un objeto en el cual le decimos a passport como se llama el campo donde esta el username de nuestro usuario (en este caso es email)
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  // En esta funcion comprobaremos que existe el email y que su contraseña sea correcta
  User.findOne({ where: { email: email } })
    .then(user => {
      //if (err) { return done(err) }
      if (!user) {
        return done(null, false, { status: 'error', message: "Email incorrecto" });
      }
      const passwordKey = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('base64');
      if (passwordKey !== user.password) {
        return done(null, false, { status: 'error', message: 'Contraseña incorrecta' });
      }
      //Esta es la funcion que va a mantener la sesion en la cookie, para poder usarlo en la app
      return done(null, user, { status: 'ok' });
    })
    .catch(err => {
      return done(err);
    })
}))

// ARTURO - Tambien funciona - la dejo para comparar despues
/* passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async function (email, password, done) {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return done(null, null, { status: 'error', message: "Email incorrecto" });
      }

      const passwordKey = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('base64');
      if (passwordKey === user.password) {
        return done(null, user, { status: 'ok' });
      } else {
        return done(null, null, { status: 'error', message: 'Contraseña incorrecta' })
      }
      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
    } catch (err) {
      return done(err);
    }
  }
)); */

//PASO 2, SERIALIZAR Y DESERIALZAR LA SESION
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.

//2)A) SERIALIZAR
// El primer parametro user hace referencia a un objeto que viene de nuestra base de datos con toda la iformacion del mismo
// El segundo parametro, es una funcion de callback que nos notifica cuando terminamos de hacer la serializacion
passport.serializeUser((user, done) => {
  done(null, user.id); // En la cookie solo mando la id desde la base de datos para identificar el usuario, no el email,password,etc
  // Passport utiliza el user.id para matchear entre las sesiones y los objetos de la base de datos
});
//2)B) DESSERIALIZAR
// Cuando llegue un Id en un cookie, passport va a preguntarle a la base de datos a que usuario corresponde este Id
passport.deserializeUser((id, done) => {
  User.findByPk(id) //Tambien funciona con User.findOne({ where: { id } })
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      return done(err);
    })
});

/* 
// ARTURO
// el primer paramatro se refiere a un error si llegase a suceder, el segundo el usuario si es que lo encuentra
  User.findByPk(id, (err, user) => {
    done(err, user);
  });
*/

/* 
 .then((err, user) => {
    done(err, user);
  });
});
*/

// PASO 3 MANEJAR SESION
// Passport no sabe manejar las sesiones, sino que agrega informacion a esa sesion
server.use(session({
  secret: 'String secreto, Luego pasarlo a salt', // posible problema con cookie parser
  resave: false, // Fuerza a que por cada llamada que se haga al servidor, la informacion de la sesion se guarde en la base de datos independientemente de que haya cambios o no
  saveUninitialized: false // la sesion es un objeto en blanco al cual se le agrega informacion. Este guarda el objeto aunque el objeto este vacio
}));

// PASO 4 INICIALIZAR PASSPORT Y RECUPERAR EL ESTADO DE AUTENTICACION DE LA SESION
server.use(passport.initialize());
server.use(passport.session());
/* 
// Middleware para debuguear
server.use((req, res, next) => {
  console.log('Middleware para verificar sesion. App en la linea 134')
  console.log("Session: ", req.session);
  console.log("User:", req.user);
  next();
});
 */
//todos los pedidos http pasan por estos middlewares
//server.use(cors()) // EL CORS VA A JODER LA SESSION
server.use(json());
server.use(cookieParser());
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ extended: false /* o true? */, limit: '50mb' }));
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

server.post('/', async (req, res) => {
  // CREAR CATEGORIAS
  const categoria1 = await Category.create({
    name: "Negra",
    description: "color negro.",
    active: true
  });
  const categoria2 = await Category.create({
    name: "Roja",
    description: "color rojizo.",
    active: true
  });
  const categoria3 = await Category.create({
    name: "Rubia",
    description: "color dorado.",
    active: true
  });
  const categoria4 = await Category.create({
    name: "Pilsener",
    description: "Estilo de baja fermentación originario de la República Checa.",
    active: true
  })
  const categoria5 = await Category.create({
    name: "IPA",
    description: "Estilo que se caracteriza principalmente por la abundante presencia de lúpulo, lo que se traduce en un aroma muy intenso, matices de sabor particulares y mayor grado de amargor.",
    active: true
  })
  const categoria6 = await Category.create({
    name: "Stout",
    description: "Estilo de cerveza muy oscura, que posee un perfil de sabor profundamente tostado.",
    active: true
  })

  // CREAR PRODUCTOS
  const producto1 = Product.create({
    name: "Quilmes",
    description: "Es una cerveza equilibrada, de gran refrescancia y cuerpo balanceado, que marida con platos más bien grasosos o pesados.",
    price: 50,
    stock: 10,
    picture: "https://http2.mlstatic.com/D_NQ_NP_799779-MLA32720674206_102019-O.webp",
    active: true
  })

  const producto2 = Product.create({
    name: "Imperial Cream Stour",
    description: "Cerveza negra, de cuerpo y espuma cremosa, su intenso amargor se compensa con notas de chocolate y café provenientes del golpe de fuego que recibe la malta al momento de ser tostada.",
    price: 70,
    stock: 10,
    picture: "https://growlerstore.com.ar/1034-thickbox_default/imperial-cream-stout-lata-473-cm3.jpg",
    active: true
  })

  const producto3 = Product.create({
    name: "Patagonia Kune",
    description: "Combinación de maltas especiales, que da lugar a una cerveza de color dorado bronce brillante de leve amargor y cuerpo medio. Cerveza muy balanceada y fácil de tomar.",
    price: 130,
    stock: 10,
    picture: "https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/3100542_f.jpg",
    active: true
  })

  const producto4 = Product.create({
    name: "Andes Origen Roja",
    description: "Sabor a malta, leve aroma a lupulo y a cereal, cuerpo medio, refrescante.",
    price: 140,
    stock: 10,
    picture: "https://statics.dinoonline.com.ar/imagenes/large_460x460/3100628_l.jpg",
    active: true
  })

  const producto5 = Product.create({
    name: "Corona",
    description: "Corona comenzó a elaborarse en México y casi un siglo después sigue produciéndose allí. Presente en más de 180 países y mundialmente conocida por ritual de la lima, es la cerveza mexicana más vendida del mundo desde 1925.",
    price: 145,
    stock: 10,
    picture: "https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/3100145_f.jpg",
    active: true
  })

  const producto6 = Product.create({
    name: "Stella Artois",
    description: "Stella Artois es una marca de cerveza lager de 5,0% grados de alcohol con un sabor ligeramente dulce y afrutado en balance con su claro amargor, y aromas herbales a lúpulo que la hacen única.",
    price: 150,
    stock: 10,
    picture: "https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/3100084_f.jpg",
    active: true
  })

  // CREAR USUARIOS

  const user1 = User.create({
    first_name: "admin",
    last_name: "admin",
    adress: "admin",
    email: "admin@gmail.com",
    active: true,
    password: crypto.pbkdf2Sync('12345678', '', 10000, 64, 'sha512').toString('base64'),
    salt: '',
    admin: true
  });

  const user2 = User.create({
    first_name: "Dario",
    last_name: "Nuñez",
    adress: "Ciudad de Buenos Aires",
    email: "dario@gmail.com",
    active: true,
    password: crypto.pbkdf2Sync('12345678', '', 10000, 64, 'sha512').toString('base64'),
    salt: '',
    admin: true
  });

  const user3 = User.create({
    first_name: "Junior",
    last_name: "Rosario",
    adress: "Neuquen",
    email: "junior@gmail.com",
    active: true,
    password: crypto.pbkdf2Sync('12345678', '', 10000, 64, 'sha512').toString('base64'),
    salt: '',
    admin: true
  });

  const user4 = User.create({
    first_name: "Pablo",
    last_name: "Lezcano",
    adress: "Ciudad de Buenos Aires",
    email: "pablo@gmail.com",
    active: true,
    password: crypto.pbkdf2Sync('12345678', '', 10000, 64, 'sha512').toString('base64'),
    salt: '',
    admin: true
  });

  const user5 = User.create({
    first_name: "Lautaro",
    last_name: "Mondati",
    adress: "La Plata",
    email: "lautaro@gmail.com",
    active: true,
    password: crypto.pbkdf2Sync('12345678', '', 10000, 64, 'sha512').toString('base64'),
    salt: '',
    admin: true
  });

  const user6 = User.create({
    first_name: "Nahuel",
    last_name: "Russo",
    adress: "Berisso",
    email: "nahuel@gmail.com",
    active: true,
    password: crypto.pbkdf2Sync('12345678', '', 10000, 64, 'sha512').toString('base64'),
    salt: '',
    admin: true
  });

  const user7 = User.create({
    first_name: "Arturo",
    last_name: "Lidueña",
    adress: "Malta",
    email: "arturo@gmail.com",
    active: true,
    password: crypto.pbkdf2Sync('12345678', '', 10000, 64, 'sha512').toString('base64'),
    salt: '',
    admin: true
  });
});


// Error catching endware. 
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
