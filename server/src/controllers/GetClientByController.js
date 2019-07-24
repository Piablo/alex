const { Clients } = require("../models");

module.exports = {
  model(req, res) {
    var field = req.body.field;

    if (field === "firstName") {
      var firstName = req.body.data;
      Clients.findAll({
        where: {
          firstName: firstName
        }
      })
        .then(resp => {
          res.json(resp);
        })
        .catch(error => {
          res.send(error);
        });
    } else if (field === "middleName") {
      var middleName = req.body.data;
      Clients.findAll({
        where: {
          middleName: middleName
        }
      })
        .then(resp => {
          res.json(resp);
        })
        .catch(error => {
          res.send(error);
        });
    } else if (field === "lastName") {
      var lastName = req.body.data;
      Clients.findAll({
        where: {
          lastName: lastName
        }
      })
        .then(resp => {
          res.json(resp);
        })
        .catch(error => {
          res.send(error);
        });
    }
  }
};
