const { allProducts, singleProduct, createProduct } = require("../services/productServices");

// Get all products
exports.all_products = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  allProducts({ page, limit })
    .then((result) => {
      // console.log(result);
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};

// Get Single Product
exports.single_product = async (req, res, next) => {
  const { productId } = req.params;
  singleProduct({ productId })
    .then((result) => {
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};

// Create Product
exports.create_product = async (req, res, next) => {
  const { cat_id, title, url_slug, image, images, description, price, quantity, short_desc } = req.body;
  createProduct({ cat_id, title, url_slug, image, images, description, price, quantity, short_desc })
  .then((result) => {
    const { statusCode = 200, status, message, data } = result;
    res.status(statusCode).send({ status, message, data });
  })
  .catch((err) => {
    const { statusCode = 400, status, message, data } = err;
    res.status(statusCode).send({ status, message, data }) && next(err);
  });
};

