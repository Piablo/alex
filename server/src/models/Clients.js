module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Clients",
    {
      clientId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      titleId: {
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING
      },
      middleName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.TEXT
      },
      contacts: {
        type: DataTypes.TEXT
      }
    },
    {
      timestamps: false
    }
  );
