const loadProductService = require("../services/loadProductService.js");

const loadProduct = async (req, res) => {
  try {
    let statusId = req.query.statusId;
    let IdAuthor = req.query.IdAuthor;
    if (!statusId && !IdAuthor) {
      console.log(">>>", statusId, ">>>", IdAuthor);
      let data = await loadProductService.loadProduct(null, null);
      return res.status(200).json({
        errCode: 0,
        message: "!statusId && !IdAuthor",
        data: data,
      });
    } else if (!statusId && IdAuthor) {
      console.log(">>>", statusId, ">>>", IdAuthor);
      let data = await loadProductService.loadProduct(null, IdAuthor);
      return res.status(200).json({
        errCode: 0,
        message: "!statusId && IdAuthor",
        data: data,
      });
    } else if (statusId && !IdAuthor) {
      console.log(">>>", statusId, ">>>", IdAuthor);
      let data = await loadProductService.loadProduct(statusId, null);
      return res.status(200).json({
        errCode: 0,
        message: "statusId && !IdAuthor",
        data: data,
      });
    } else if (statusId && IdAuthor) {
      console.log(">>>", statusId, ">>>", IdAuthor);
      let data = await loadProductService.loadProduct(statusId, IdAuthor);
      return res.status(200).json({
        errCode: 0,
        message: "statusId && IdAuthor",
        data: data,
      });
    }
  } catch (e) {
    console.log(">>> loading product failed");
    return res.status(400).json({
      errCode: 1,
      errMessage: "loading product failed",
    });
  }
};

module.exports = {
  loadProduct: loadProduct,
};
