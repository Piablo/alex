module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "ItemModels",
    {
      modelId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      model: {
        type: DataTypes.STRING
      },
      brandId: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false
    }
  );
