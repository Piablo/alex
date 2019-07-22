const { Titles } = require("../models");

module.exports = {
  model(req, res) {
    Titles.findAll()
      .then(resp => {
        res.json(resp);
      })
      .catch(error => {
        res.send(error);
      });
  }
};
