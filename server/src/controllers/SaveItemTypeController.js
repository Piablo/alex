const { ItemTypes } = require("../models");

module.exports = {
  model(req, res) {
    var itemType = req.body;

    ItemTypes.create(itemType)
      .then(resp => {
        res.send(resp);
      })
      .catch(error => {
        res.send(error);
      });
  }
};
