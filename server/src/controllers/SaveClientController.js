const { Clients } = require("../models");

module.exports = {
  model(req, res) {
    console.log("FromSaveClientController");

    var client = req.body;

    Clients.create(client)
      .then(resp => {
        res.send(resp);
      })
      .catch(error => {
        res.send(error);
      });
  }
};
