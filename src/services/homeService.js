const db = require("../models/index.js");

const sortProduct = (sortBy, authorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!sortBy && !authorId) {
        let data = await db.Product.findAll({
          include: [{ model: db.User }, { model: db.AllCode }],
          // attributes: {
          //   exclude: ["image"],
          // },
        });
        resolve(data);
      } else if (!sortBy && authorId) {
        let data = await db.Product.findAll({
          where: { IdAuthor: authorId },
          include: [{ model: db.User }, { model: db.AllCode }],
          // attributes: {
          //   exclude: ["image"],
          // },
        });
        resolve(data);
      } else if (sortBy && !authorId) {
        let data = await db.Product.findAll({
          where: { statusId: sortBy },
          include: [{ model: db.User }, { model: db.AllCode }],
        });
        resolve(data);
      } else if (sortBy && authorId) {
        let data = await db.Product.findAll({
          where: { statusId: sortBy, IdAuthor: authorId },
          include: [{ model: db.User }, { model: db.AllCode }],
        });
        resolve(data);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  sortProduct: sortProduct,
};
