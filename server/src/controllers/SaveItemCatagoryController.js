const { ItemCatagories } = require("../models");

module.exports = {
  model(req, res) {
    console.log("From SaveItemCatagoryController");
    console.log(req.body);
    var itemCatagory = req.body;

    ItemCatagories.create(itemCatagory)
      .then(resp => {
        res.send(resp);
      })
      .catch(error => {
        res.send(error);
      });
  }
};
