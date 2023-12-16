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
  router.get("/getUsers", userController.getUsers);
  router.post("/editUser", userController.editUser);
  router.post("/createUser", userController.createUser);
  router.post("/deleteUser", userController.deleteUser);
  router.get("/getOrders", userController.getOrders);
  router.post("/completeOrders", userController.completeOrders);
  router.get("/getCart", userController.getCart);
  router.get("/getDeliveryAddress", userController.getDeliveryAddress);
  router.post("/createOrders", userController.createOrders);
  router.post("/setOrdered", userController.setOrdered);
  router.post("/createDeliveryAddress", userController.createDeliveryAddress);
  router.post("/updateDeliveryAddress", userController.updateDeliveryAddress);
  router.get("/isProductExist", userController.isProductExist);
  router.post("/addToCart", userController.addToCart);
  router.post("/cancelOrders", userController.cancelOrders);
  router.post("/confirmOrders", userController.confirmOrders);
  router.post("/editProduct", userController.editProduct);

  return app.use("/", router);
};

// export default initWebRoutes;

module.exports = initWebRoutes;
