// import express from "express";
const express = require("express");
const userController = require("../controller/userController");
const homeController = require("../controller/homeController");
const loadProductController = require("../controller/loadProductController");

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("hello world");
  });

  router.post("/login", userController.login);
  router.post("/upload", userController.uploadProduct);
  router.get("/loadingProduct", loadProductController.loadProduct);
  router.get("/productDetail", userController.productDetail);
  router.post("/createConversation", userController.createConversation);
  router.post("/conversationExist", userController.conversationExist);
  router.get("/getMessage", userController.getMessage);
  router.get("/getAllConversation", userController.getAllConversation);
  router.post("/confirmProduct", userController.confirmProduct);
  router.post("/deleteProduct", userController.deleteProduct);

  return app.use("/", router);
};

// export default initWebRoutes;

module.exports = initWebRoutes;
