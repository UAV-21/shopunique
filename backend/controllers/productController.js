const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {
  allProducts,
  singleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productServices");
const ErrorHandler = require("../utils/ErrorHandler");

// Get all products
exports.all_products = catchAsyncErrors(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await allProducts({ page, limit })    
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ success:true, message, data });
});
// exports.all_products = async (req, res, next) => {
//   const { page = 1, limit = 10 } = req.query;

//   allProducts({ page, limit })
//     .then((result) => {
//       // console.log(result);
//       const { statusCode = 200, message, data } = result;
//       res.status(statusCode).send({ message, data });
//     })
//     .catch((err) => {
//       const { statusCode = 400, message, data } = err;
//       res.status(statusCode).send({ message, data }) && next(err);
//     });
// };

// Get Single Product
exports.single_product = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.params;
  const result = await singleProduct({ productId });
  const { statusCode = 200, message, data } = result;
  res.status(statusCode).send({success:true, message, data });
});
// exports.single_product = catchAsyncErrors(async (req, res, next) => {
//   // console.log(req.user.user)
//   const { productId } = req.params;
//   singleProduct({ productId })
//     .then((result) => {
//       const { statusCode = 200, message, data } = result;
//       res.status(statusCode).send({ message, data });
//     })
//     .catch((err) => {
//       const { statusCode = 400, message, data } = err;
//       // res.status(statusCode).send({ message, data }) && next(err);
//       return next(new ErrorHandler(message, statusCode))
//     });
// });
//--------------------------------------------------------

// Create Product
exports.create_product = async (req, res, next) => {
  const {
    cat_id,
    title,
    url_slug,
    image,
    images,
    description,
    price,
    quantity,
    short_desc,
  } = req.body;
  createProduct({
    cat_id,
    title,
    url_slug,
    image,
    images,
    description,
    price,
    quantity,
    short_desc,
  })
    .then((result) => {
      const { statusCode = 200, status, message, data } = result;
      res.status(statusCode).send({ status, message, data });
    })
    .catch((err) => {
      const { statusCode = 400, status, message, data } = err;
      res.status(statusCode).send({ status, message, data }) && next(err);
    });
};

// Update Product
exports.update_product = async (req, res, next) => {
  const { productId } = req.params;
  const {
    cat_id,
    title,
    url_slug,
    image,
    images,
    description,
    price,
    quantity,
    short_desc,
  } = req.body;

  updateProduct({
    productId,
    cat_id,
    title,
    url_slug,
    image,
    images,
    description,
    price,
    quantity,
    short_desc,
  })
    .then((result) => {
      const { statusCode = 200, status, message } = result;
      res.status(statusCode).send({ status, message });
    })
    .catch((err) => {
      const { statusCode = 400, status, message, data } = err;
      res.status(statusCode).send({ status, message, data }) && next(err);
    });
};

// Delete Product
exports.delete_product = async (req, res, next) => {
  const { productId } = req.params;

  deleteProduct({ productId })
    .then((result) => {
      const { statusCode = 200, status, message, data } = result;
      res.status(statusCode).send({ status, message, data });
    })
    .catch((err) => {
      const { statusCode = 400, status, message, data } = err;
      res.status(statusCode).send({ status, message, data });
    });
};
