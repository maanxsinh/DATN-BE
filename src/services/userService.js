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
};
