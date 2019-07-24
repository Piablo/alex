const GetTitlesController = require("./controllers/GetTitlesController");
const GetItemTypesController = require("./controllers//GetItemTypesController");
const GetItemCatagoriesController = require("./controllers/GetItemCatagoriesController");
const GetItemBrandsController = require("./controllers/GetItemBrandsController");
const GetItemModelsController = require("./controllers/GetItemModelsController");
const GetClientByController = require("./controllers/GetClientByController");

const SaveClientController = require("./controllers/SaveClientController");
const SaveItemTypeController = require("./controllers/SaveItemTypeController");
const SaveItemCatagoryController = require("./controllers/SaveItemCatagoryController");
const SaveItemBrandController = require("./controllers/SaveItemBrandController");
const SaveItemModelController = require("./controllers/SaveItemModelController");

module.exports = app => {
  app.post("/api/get-titles", GetTitlesController.model);
  app.post("/api/get-item-types", GetItemTypesController.model);
  app.post("/api/get-item-catagories", GetItemCatagoriesController.model);
  app.post("/api/get-item-brands", GetItemBrandsController.model);
  app.post("/api/get-item-models", GetItemModelsController.model);
  app.post("/api/get-client-by", GetClientByController.model);

  app.post("/api/save-client", SaveClientController.model);
  app.post("/api/save-item-type", SaveItemTypeController.model);
  app.post("/api/save-item-catagory", SaveItemCatagoryController.model);
  app.post("/api/save-item-brand", SaveItemBrandController.model);
  app.post("/api/save-item-model", SaveItemModelController.model);
};
