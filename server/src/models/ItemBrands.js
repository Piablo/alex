module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "ItemBrands",
    {
      brandId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      catagoryId: {
        type: DataTypes.INTEGER
      },
      brand: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );
