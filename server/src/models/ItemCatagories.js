module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "ItemCatagories",
    {
      catagoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      typeId: {
        type: DataTypes.INTEGER
      },
      catagory: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );
