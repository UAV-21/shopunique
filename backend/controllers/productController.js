const { allProducts, singleProduct } = require("../services/productServices");

exports.all_products = async (req,res,next)=>{
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

exports.single_product = async (req,res,next) => {
    const { productId } = req.params;
    singleProduct({ productId }).then((result) => {
        const { statusCode = 200, message, data } = result;
        res.status(statusCode).send({ message, data })
    })
    .catch((err) => {
        const { statusCode=400, message, data } = err;
        res.status(statusCode).send({ message, data }) && next(err);
    });
}