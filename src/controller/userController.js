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

const getUsers = async (req, res) => {
  try {
    let users = await userService.getUsers();
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: users,
    });
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "get users failed",
    });
  }
};

const editUser = async (req, res) => {
  try {
    let data = req.body.data;
    let userId = req.body.userId;
    let edit = { address: "abc" };
    if (!userId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing userId",
      });
    }
    await userService.editUser(data, userId);
    console.log(">>>data in controller:", userId);
    return res.status(200).json({
      errCode: 0,
      errMessage: "update success",
      data: userId,
    });
  } catch (e) {
    console.log(">>>update user failded:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "update user failed",
    });
  }
};

const createUser = async (req, res) => {
  try {
    let data = req.body.data;
    let testData = {
      fullName: "abc",
      email: "abc@gmail.com",
      password: "123456",
      phoneNumber: "0113334444",
      gender: "Other",
      typeRole: "R2",
      address: "dau cung duoc",
    };
    if (!data) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing data",
      });
    }
    let user = await userService.createUser(data);
    return res.status(200).json({
      errCode: 0,
      errMessage: "create user success",
      data: user,
    });
  } catch (e) {
    console.log("---create user failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "---create user failed",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let userId = req.body.userId;
    if (!userId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing userId",
      });
    }
    let userDelete = await userService.deleteUser(userId);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: userDelete,
    });
  } catch (e) {
    console.log("---delete user failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "delete user failed",
    });
  }
};

const completeOrders = async (req, res) => {
  try {
    let arrOrdersId = req.body.arrOrdersId;
    let arrTest = [26];
    if (!arrOrdersId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing array orders id",
      });
    }
    let ordersComplete = await userService.completeOrders(arrTest);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: ordersComplete,
    });
  } catch (e) {
    console.log(">>> complete orders failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: ">>> complete orders failed",
    });
  }
};

// BUYER CONTROLLER

const getCart = async (req, res) => {
  try {
    let ownCartId = req.query.ownCartId;
    if (!ownCartId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing ownCartId",
      });
    }
    let cart = await userService.getCart(ownCartId);
    let authorArr = null;
    // console.log(">>>includes:", authorArr.includes(cart[0].authorName));
    // authorArr.push(cart[0].authorName);
    const setAuthorArr = () => {
      let arr = cart.map((item) => {
        return item.authorName;
      });
      authorArr = arr.filter(function (item, pos) {
        return arr.indexOf(item) == pos;
      });
    };
    setAuthorArr();

    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: cart,
      authorArr: authorArr,
    });
  } catch (e) {
    console.log("---get cart failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "---get cart failed",
    });
  }
};

const createDeliveryAddress = async (req, res) => {
  try {
    let userId = req.body.userId;
    let data = req.body.data;
    let dataTest = { userId: 4 };
    if (!data || !userId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing data or userId",
      });
    }
    let addressInf = await userService.createDeliveryAddress(userId, data);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: addressInf,
    });
  } catch (e) {
    console.log("---create delivery address failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "create delivery address failed",
    });
  }
};

const updateDeliveryAddress = async (req, res) => {
  try {
    let userId = req.body.userId;
    let data = req.body.data;
    let dataTest = { address: "abc" };
    if (!userId || !data) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing userId or data",
      });
    }
    let updateAddress = await userService.updateDeliveryAddress(userId, data);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: updateAddress,
    });
  } catch (e) {
    console.log("---update delivery address failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "---update delivery address failed",
    });
  }
};

const getDeliveryAddress = async (req, res) => {
  try {
    let userId = req.query.userId;
    if (!userId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing userId",
      });
    }
    let deliveryAddress = await userService.getDeliveryAddress(userId);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: deliveryAddress,
    });
  } catch (e) {
    console.log("---get delivery address failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "---get delivery address failed",
    });
  }
};

const createOrders = async (req, res) => {
  try {
    let data = req.body.data;
    let dataTest = [{ buyerId: 4 }, { sellerId: 5 }];
    if (!data) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing data",
      });
    }
    let ordersCreate = await userService.createOrders(data);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: ordersCreate,
    });
  } catch (e) {
    console.log("---create orders failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "---create orders failed",
    });
  }
};

const setOrdered = async (req, res) => {
  try {
    let arrProducts = req.body.arrProducts;
    let arrTest = [17, 32];
    if (!arrProducts) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing arrProducts",
      });
    }
    let data = await userService.setOrdered(arrProducts);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    console.log("---set orders failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "---set orders failed",
    });
  }
};

const isProductExist = async (req, res) => {
  try {
    let data = req.query.data;
    let dataTest = {
      authorName: "Nguyen Van Quan",
      ownCartId: 2,
      productId: 8,
    };
    if (!data) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing data to check exist",
      });
    }
    let isExist = await userService.isProductExist(data);
    return res.status(200).json({
      errCode: 0,
      errMessage: "check success",
      data: isExist,
    });
  } catch (e) {
    console.log("---check product exist in cart failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "---check product exist in cart failed:",
    });
  }
};

const addToCart = async (req, res) => {
  try {
    let data = req.body.data;
    let dataTest = { authorName: "111" };
    if (!data) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing data to add to cart",
      });
    }
    let addPro = await userService.addToCart(data);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: addPro,
    });
  } catch (e) {
    console.log("--add to cart failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "--- add to cart failed",
    });
  }
};

const cancelOrders = async (req, res) => {
  try {
    let productId = req.body.productId;
    if (!productId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing productId",
      });
    }
    let product = await userService.cancelOrders(productId);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: product,
    });
  } catch (e) {
    console.log("---cancel orders failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "---cancel orders failed",
    });
  }
};

const confirmOrders = async (req, res) => {
  try {
    let productId = req.body.productId;
    if (!productId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing productId",
      });
    }
    let data = await userService.confirmOrders(productId);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    console.log("---confirm orders failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "---confirm orders failed",
    });
  }
};

/// GET ORDERS
const getOrders = async (req, res) => {
  try {
    let role = req.query.role;
    let userId = req.query.userId;
    let statusName = req.query.statusName;
    if (!role || !statusName) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing role or statusName",
      });
    }
    let orders = await userService.getOrders(role, userId, statusName);
    // if (orders && orders.length > 0) {
    //   orders.map((item) => {
    //     item.Product.imageToBase64 = new Buffer(
    //       item.Product.image.data,
    //       "base64"
    //     ).toString("binary");
    //     return item;
    //   });
    // }
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: orders,
    });
  } catch (e) {
    console.log("---get orders failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "---get orders failed",
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

const editProduct = async (req, res) => {
  try {
    let data = req.body.data;
    let productId = req.body.productId;
    let dataTest = { description: undefined };
    if (!productId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing productId",
      });
    }
    let productEdit = await userService.editProduct(data, productId);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: productEdit,
    });
  } catch (e) {
    console.log("---edit product failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "---edit product failed",
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
    let userId = req.query.userId;
    if (!conversationId || !userId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing conversationId or userId",
      });
    }
    let data = await userService.getMessage(conversationId, userId);

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
    // console.log("all data:", data);
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

const sendMessage = async (req, res) => {
  try {
    let dataMessage = req.body.dataMessage;
    let dataTest = {
      conversationId: 8,
      senderId: 4,
      receiverId: 2,
      content: "hello world!",
    };
    if (!dataMessage) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing data message",
      });
    }
    let data = await userService.sendMessage(dataMessage);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    console.log("send message failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "send message failed",
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
  editUser: editUser,
  getUsers: getUsers,
  createUser: createUser,
  deleteUser: deleteUser,
  getOrders: getOrders,
  completeOrders: completeOrders,
  getCart: getCart,
  getDeliveryAddress: getDeliveryAddress,
  createOrders: createOrders,
  setOrdered: setOrdered,
  createDeliveryAddress: createDeliveryAddress,
  updateDeliveryAddress: updateDeliveryAddress,
  isProductExist: isProductExist,
  addToCart: addToCart,
  cancelOrders: cancelOrders,
  confirmOrders: confirmOrders,
  editProduct: editProduct,
  sendMessage: sendMessage,
};
