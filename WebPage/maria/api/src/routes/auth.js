const server = require('express').Router();
const passport = require('passport');
const crypto = require('crypto');
const { User } = require('../db.js');

//checks if password has > 8 chars
function isValidPassword(password) {
  if (password.length >= 8) {
    return true;
  }
  return false;
}

//uses a regex to check if email is valid
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//handles register POST
server.post('/register', async function (req, res, next) {
  const salt = crypto.randomBytes(64).toString('hex');
  const password = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, 'sha512').toString('base64');

  if (!isValidPassword(req.body.password)) {
    return res.json({ status: 'error', message: 'La contraseña debe tener 8 o más carácteres' });
  }
  if (!isValidEmail(req.body.email)) {
    return res.json({ status: 'error', message: 'Email address not formed correctly.' });
  }

  try {
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      adress: req.body.adress,
      email: req.body.email,
      active: true,
      password: password,
      salt: salt,
      admin: false
    });
    if (user) {
      passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) {
          return res.json({ status: 'error', message: info.message, err });
        }
        //Una vez registrado el usuario, hacemos login automaticamente
        req.logIn(user, function (err) {
          if (err) { return next(err); }
          return res.json({ status: 'ok' });
        });
      })(req, res, next);
    }
  } catch (err) {
    console.log(err)
    return res.json({ status: 'error', message: 'Esta dirección de email ya está registrada' });
  }
});
//S70Crear-Ruta-para-password-reset
//POST /users/:id/passwordReset
server.put('/:id/passwordReset', (req, res, next) => {
  const { id } = req.params;
  const salt = crypto.randomBytes(64).toString('hex')
  const password = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, 'sha512').toString('base64')

  User.findByPk(id)
    .then((user) => {
      if (user) {
        user.password = password
        user.salt = salt
        return user.save()
      }
    }).then((user) => {
      res.sendStatus(200);
    }).catch(next)
})

server.put('/promote/:id', (req, res, next) => {
  const userChange = req.params.id;
  User.update({
    admin: true
  }, { where: { id: userChange } })
    .then(change => {
      res.sendStatus(200)
    }).catch(err => {
      next(err);
      res.status(400);
    })
})
// ARTURO
server.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.status(400).json({ status: 'error', message: info.message, err });
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.json({ status: 'ok', user }); //Tambien anda con send(user) o send(req.user)
    });
  })(req, res, next);
  // la funcion authenticate requiere de otra funcion que debe ser invocada, por eso pasamos el (req, res, next). Es "magia" de passport
});

// Luego exportar FUNCION PARA CORROBORAR QUE ESTE AUTENTICADO, SE USARA EN EL FUTURO

function isAutenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Para acceder a este recurso debes estar logueado')
  }
}

server.get('/logout', isAutenticated, (req, res) => {
  req.logOut();
  res.redirect('/');
});


server.get('/me', isAutenticated, (req, res) => {
  res.json(req.user);
});


module.exports = server, isAutenticated;