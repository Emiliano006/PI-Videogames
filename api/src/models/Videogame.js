const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 15],
          msg: 'The name must be between 5 and 15 characters.',
        }
      }
    },
    description: {
      type:DataTypes.TEXT,
      allowNull : false,
      validate:{
        len:{
          args:[10, 200],
          msg:'The description must be between 20 and 400 characters long.',
        } 
      }
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        validate: {
          isUrl: {
            msg: 'You must enter a valid URL.',
          },
        },
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    db: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  
  },
  { freezeTableName: true,
    timestamps: false 
  });
};
