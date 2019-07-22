const { ItemBrands } = require("../models");

module.exports = {
  model(req, res) {
    var itemBrand = req.body;

    ItemBrands.create(itemBrand)
      .then(resp => {
        res.send(resp);
      })
      .catch(error => {
        res.send(error);
      });
  }
};
