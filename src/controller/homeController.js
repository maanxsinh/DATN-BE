const homeService = require("../services/homeService.js");

const sortProduct = async (req, res) => {
  try {
    let sortBy = req.query.sortBy;
    let authorId = req.query.authorId;
    if (!sortBy && !authorId) {
      let data = await homeService.sortProduct();
      console.log(">>>!sortBy && !authorId");
      return res.status(200).json({
        errCode: 0,
        errMessage: "!sortBy && !authorId",
        data: data,
      });
    } else if (!sortBy && authorId) {
      console.log(">>>!sortBy && authorId", authorId);
      let data = await homeService.sortProduct(sortBy, authorId);
      return res.status(200).json({
        err: 0,
        message: "!sortBy && authorId",
        product: data,
      });
    } else if (sortBy && !authorId) {
      console.log(">>>sortBy && !authorId");
      let data = await homeService.sortProduct(sortBy, null);
      return res.status(200).json({
        err: 0,
        message: "sortBy && !authorId",
        product: data,
      });
    } else if (sortBy && authorId) {
      console.log(">>>sortBy && authorId", sortBy, authorId);
      let data = await homeService.sortProduct(sortBy, authorId);
      return res.status(200).json({
        err: 0,
        message: "sortBy && authorId",
        product: data,
      });
    }

    console.log(">>> du lieu san pham:", data);
  } catch (e) {
    console.log(">>>LOI", e);
    return res.status(200).json({
      err: 1,
      message: "loading product failed",
    });
  }
};

module.exports = {
  sortProduct: sortProduct,
};
