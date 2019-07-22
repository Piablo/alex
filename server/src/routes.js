const GetTitlesController = require("./controllers/GetTitlesController");
const GetItemTypesController = require("./controllers//GetItemTypesController");
const GetItemCatagoriesController = require("./controllers//GetItemCatagoriesController");
const GetItemBrandsController = require("./controllers//GetItemBrandsController");

const SaveClientController = require("./controllers/SaveClientController");
const SaveItemTypeController = require("./controllers/SaveItemTypeController");
const SaveItemCatagoryController = require("./controllers/SaveItemCatagoryController");
const SaveItemBrandController = require("./controllers/SaveItemBrandController");

module.exports = app => {
  app.post("/api/get-titles", GetTitlesController.model);
  app.post("/api/get-item-types", GetItemTypesController.model);
  app.post("/api/get-item-catagories", GetItemCatagoriesController.model);
  app.post("/api/get-item-brands", GetItemBrandsController.model);

  app.post("/api/save-client", SaveClientController.model);
  app.post("/api/save-item-type", SaveItemTypeController.model);
  app.post("/api/save-item-catagory", SaveItemCatagoryController.model);
  app.post("/api/save-item-brand", SaveItemBrandController.model);
};
