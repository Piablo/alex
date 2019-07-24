const { ItemModels } = require("../models");

module.exports = {
  model(req, res) {
    var brandId = req.body.brandId;
    ItemModels.findAll({
      where: {
        brandId: brandId
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
