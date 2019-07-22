const { ItemBrands } = require("../models");

module.exports = {
  model(req, res) {
    var catagoryId = req.body.catagoryId;
    ItemBrands.findAll({
      where: {
        catagoryId: catagoryId
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
