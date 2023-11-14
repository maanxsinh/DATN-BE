const db = require("../models/index.js");

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

module.exports = {
  uploadProduct: uploadProduct,
};
