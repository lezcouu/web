const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  // S53 : Crear Modelo de Reviews
  const Reviews = sequelize.define('reviews', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualification: {
      type: DataTypes.FLOAT, // HAY que definir si va a ser con letras muy bueno-bueno-malo-pesimo / numeros del 1 al 10
    }
  })
};

/*
Crear el modelo Reviews y relacionarlo con Producto.
Un producto puede tener muchas reviews. Una review es de un usuario.
La review debe tener un sistema de calificación y una descripción
*/