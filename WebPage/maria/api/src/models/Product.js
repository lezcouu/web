const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  // S4: Crear Modelo de Productos
  const Product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },

    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true,
    }
  });
};
