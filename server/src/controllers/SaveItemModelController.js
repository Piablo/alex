const { ItemModels } = require("../models");

module.exports = {
  model(req, res) {
    var itemModel = req.body;

    ItemModels.create(itemModel)
      .then(resp => {
        res.send(resp);
      })
      .catch(error => {
        res.send(error);
      });
  }
};
