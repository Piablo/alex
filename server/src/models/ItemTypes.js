module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "ItemTypes",
    {
      typeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      itemType: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );
