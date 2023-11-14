const db = require("../models/index.js");

const loadProduct = (statusId, IdAuthor) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!statusId && !IdAuthor) {
        let data = await db.Product.findAll({
          include: [{ model: db.User }],
          attributes: {
            // exclude: ["image"],
          },
        });
        resolve(data);
      } else if (!statusId && IdAuthor) {
        let data = await db.Product.findAll({
          where: { IdAuthor: IdAuthor },
          include: [{ model: db.User }],
          attributes: {
            // exclude: ["image"],
          },
        });
        resolve(data);
      } else if (statusId && !IdAuthor) {
        let data = await db.Product.findAll({
          where: { statusId: statusId },
          include: [{ model: db.User }],
          attributes: {
            // exclude: ["image"],
          },
        });
        resolve(data);
      } else if (statusId && IdAuthor) {
        let data = await db.Product.findAll({
          where: { statusId: statusId, IdAuthor: IdAuthor },
          include: [{ model: db.User }],
          attributes: {
            // exclude: ["image"],
          },
        });
        resolve(data);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  loadProduct: loadProduct,
};
