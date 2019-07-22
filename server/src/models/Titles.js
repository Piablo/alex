module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Titles",
    {
      TitleID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Title: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );
