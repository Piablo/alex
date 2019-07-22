const { ItemTypes } = require("../models");

module.exports = {
  model(req, res) {
    console.log("Shouldstill be working");
    ItemTypes.findAll()
      .then(resp => {
        res.json(resp);
      })
      .catch(error => {
        res.send(error);
      });
  }
};
