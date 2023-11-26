const db = require("../models/index.js");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService.js");
const sellerService = require("../services/sellerService.js");
require("dotenv").config();

const login = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
      return res.status(500).json({
        errCode: 1,
        errMessage: "missing email or password",
      });
    }
    let userData = await userService.userLogin(email, password);
    if (userData.errCode != 1) {
      const accessToken = jwt.sign(
        {
          id: userData.id,
          name: userData.fullName,
          role: userData.typeRole,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "30d" }
      );
      const refreshToken = jwt.sign(
        {
          id: userData.id,
          name: userData.fullName,
          role: userData.typeRole,
        },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "30d" }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({
        errCode: 0,
        data: userData,
        accessToken: accessToken,
        // refreshToken: refreshToken,
      });
    } else {
      return res.status(200).json({
        errCode: 1,
        message: "email or password is wrong",
      });
    }
  } catch {
    return res.status(200).json({
      errCode: 1,
      errMessage: "login failed",
    });
  }
};

//ADMIN CONTROLLER
const confirmProduct = async (req, res) => {
  try {
    let productId = req.body.productId;
    let array = [5, 6];
    if (!productId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing product ID",
      });
    }
    let data = await userService.confirmProduct(productId);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    console.log(">>> confirm product failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "confirm product failed",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let productId = req.body.productId;
    let array = [18];
    if (!productId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing product ID",
      });
    }
    let data = await userService.deleteProduct(productId);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    console.log(">>> delete product failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "delete product failed",
    });
  }
};

/// SELLER CONTROLLER

const uploadProduct = async (req, res) => {
  try {
    let dataPro = req.body.dataPro;
    let data1 = { name: "iPhone 11 promax", sort: "iPhone" };
    if (!dataPro) {
      console.log(">>>>>no data");
      return res.status(400).json({
        errCode: 1,
        errMessage: "there's no data",
      });
    }
    const product = await sellerService.uploadProduct(dataPro);
    console.log(">>> San Pham:", dataPro);
    return res.status(200).json({
      errCode: 0,
      errMessage: "upload successfull",
    });
  } catch (e) {
    console.log(">>>>>upload failed");
    return res.status(400).json({
      errCode: 1,
      errMessage: ">>>>>>upload failed",
    });
  }
};

// BUYER CONTROLLER

const productDetail = async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) {
      console.log(">>>MISSING ID");
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing id",
      });
    }
    const data = await userService.productDetail(id);
    console.log(">>>DATA:", data, "ID:", id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    console.log(">>>REJECT");
    return res.status(200).json({
      errCode: 1,
      errMessage: "loading failed",
    });
  }
};

// USER CONVERSATION

const createConversation = async (req, res) => {
  try {
    let idMaster = req.body.idMaster;
    let conversationName = req.body.conversationName;
    const conversationInf = {
      idMaster: idMaster,
      conversationName: conversationName,
    };
    if (!idMaster) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing idMaster",
      });
    }
    let isExist = await userService.createConversation(conversationInf);
    console.log(">>>conversation data:", isExist);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      isExist: isExist,
    });
  } catch (e) {
    console.log(">>>failed");
    return res.status(401).json({
      errCode: 1,
      errMessage: "create failed",
    });
  }
};

const conversationExist = async (req, res) => {
  try {
    bothID = req.body.bothID;
    if (!bothID) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing bothID",
      });
    }
    let isExist = await userService.conversationExist(bothID);
    console.log(">>>isExist:", isExist);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      isExist: isExist,
    });
  } catch (e) {
    console.log(">>>CHeck failed");
    return res.status(200).json({
      errCode: 1,
      errMessage: "check failed",
    });
  }
};

const getMessage = async (req, res) => {
  try {
    let conversationId = req.query.conversationId;
    let conversationName = req.query.conversationName;
    if (!conversationName) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing conversation name",
      });
    }
    let data = await userService.getMessage(conversationName);
    console.log(data);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    console.log(">>> get message failed");
    return res.status(200).json({
      errCode: 1,
      errMessage: "get message failed",
    });
  }
};

const getAllConversation = async (req, res) => {
  try {
    let currentUserId = req.query.currentUserId;
    if (!currentUserId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing currentUserId",
      });
    }
    let data = await userService.getAllConversation(currentUserId);
    console.log("all data:", data);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    console.log(">>>get all conversation failed", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "get all conversation failed",
    });
  }
};

module.exports = {
  login: login,
  uploadProduct: uploadProduct,
  productDetail: productDetail,
  createConversation: createConversation,
  conversationExist: conversationExist,
  getMessage: getMessage,
  getAllConversation: getAllConversation,
  confirmProduct: confirmProduct,
  deleteProduct: deleteProduct,
};
