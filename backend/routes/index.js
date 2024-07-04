const express = require("express");
const router = express.Router();

const authRoute = require("./authRoutes");
const usersRoute = require("./usersRoutes");
const productsRoute = require("./productsRoutes");
const ordersRoute = require("./ordersRoutes");


router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", usersRoute);
router.use("/api/v1/products", productsRoute);
router.use("/api/v1/orders", ordersRoute);

module.exports = router;
