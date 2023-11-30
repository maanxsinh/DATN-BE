const { resolveInclude } = require("ejs");
const db = require("../models/index.js");

const userLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let err = {};
      let isExist = await checkEmail(email);
      if (isExist) {
        // nguoi dung ton tai
        let user = await db.User.findOne({
          where: { email: email },
        });
        console.log(">>> user", user);
        if (password === user.password) {
          resolve(user);
        } else {
          err.errCode = 1;
          err.Message = "wrong password";
          console.log(">>>wrong password");
          resolve(err);
        }
      } else {
        // nguoi dung khong ton tai
        err.errCode = 1;
        err.errMessage = "user isn't exist";
        console.log(">>> nguoi dung khong ton tai");
        resolve(err);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
//ADMIN SERVICE
const confirmProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let confirmPro = await db.Product.update(
        { statusId: "CONFIRMED" },
        { where: { id: productId } }
      );
      resolve(confirmPro);
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let deleteProduct = await db.Product.destroy({
        where: { id: productId },
      });
      resolve(deleteProduct);
    } catch (e) {
      reject(e);
    }
  });
};
const getUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

const editUser = (data, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.User.update(data, { where: { id: userId } });
      console.log(">>>data in service:", data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

const completeOrders = (arrOrdersId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Order.update(
        { statusName: "COMPLETED" },
        { where: { productId: arrOrdersId } }
      );
      await db.Product.update(
        { statusId: "SOLD OUT" },
        { where: { id: arrOrdersId } }
      );
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.User.create(data);
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.User.destroy({
        where: { id: userId },
      });
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

// BUYER SERVICE
const getCart = (ownCartId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Cart.findAll({
        where: { ownCartId: ownCartId, statusName: "IN CART" },
        include: [{ model: db.Product }, { model: db.User }],
      });
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

const getDeliveryAddress = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.DeliveryAddress.findOne({
        where: { userId: userId },
      });
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

const createOrders = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Order.bulkCreate(data);
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

const setOrdered = (arrProducts) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res1 = await db.Cart.update(
        { statusName: "ORDERED" },
        { where: { productId: arrProducts } }
      );
      let res2 = await db.Product.update(
        { statusId: "SOLD OUT" },
        { where: { id: arrProducts } }
      );
      resolve(res1);
    } catch (e) {
      reject(e);
    }
  });
};

//SELLER SERVICE

const uploadProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product.create(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

// product detail

const productDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Product.findOne({
        where: { id: id },
        include: [{ model: db.User }, { model: db.AllCode }],
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

// GET ORDERS
const getOrders = (role, userId, statusName) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (role === "admin") {
        let res = await db.Order.findAll({
          where: { statusName: statusName },
          include: [
            { model: db.User },
            { model: db.Product, include: [{ model: db.User }] },
          ],
        });
        resolve(res);
      } else if (role === "buyer") {
        let res = await db.Order.findAll({
          where: {
            buyerId: userId,
            statusName: statusName,
          },
          include: [{ model: db.User }, { model: db.Product }],
        });
        resolve(res);
      } else if (role === "seller") {
        let res = await db.Order.findAll({
          where: {
            sellerId: userId,
            statusName: statusName,
          },
          include: [{ model: db.User }, { model: db.Product }],
        });
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// USER CONVERSATION

const createConversation = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let conversatinInf = await db.Conversation.create(data);
      resolve(conversatinInf);
    } catch (e) {
      reject(e);
    }
  });
};

const conversationExist = (bothID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await db.Conversation.findAll({
        where: { conversationName: bothID },
      });
      console.log(">>>is Exist:", isExist);
      if (isExist.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getMessage = (conversationName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataConversation = await db.Conversation.findOne({
        where: { conversationName: conversationName },
      });

      let dataMessage = await db.Message.findAll({
        where: { conversationId: dataConversation.id },
        include: [{ model: db.User }, { model: db.Conversation }],
      });
      resolve(dataMessage);
    } catch (e) {
      reject(e);
    }
  });
};

const getAllConversation = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = null;
      let dataPartner = [1, 2, 3, 4, 5];
      let data0 = await db.Conversation.findAll({
        where: { idMaster: currentUserId },
        include: [{ model: db.User }],
      });
      let partner0 = data0.map(async (item) => {
        let partner = await db.User.findAll({
          where: { id: "5" },
        });
        return item;
      });

      let partner1 = await db.User.findAll({
        where: { id: "5" },
      });

      let data1 = await db.Conversation.findAll({
        where: { idMember: currentUserId },
        include: [{ model: db.User }],
      });
      data = {
        imsender: data0,
        imreceiver: data1,
        partner0: partner0,
      };
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  userLogin: userLogin,
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
};
