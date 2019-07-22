const { ItemCatagories } = require("../models");

module.exports = {
  model(req, res) {
    var typeId = req.body.typeId;
    ItemCatagories.findAll({
      where: {
        typeId: typeId
      }
    })
      .then(resp => {
        res.json(resp);
      })
      .catch(error => {
        res.send(error);
      });
  }
};
