const { registerUser, loginUser } = require("../services/authService");
const { sendToken } = require("../utils/jwtToken")


exports.login_user = async (req, res, next) => {
  const { email, password } = req.body;

  loginUser({ email, password })
    .then((result) => {
      // console.log(result.data);
      sendToken(result.data, res)
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};

exports.register_user = async (req, res, next) => {
  const { fullName, email, password, role} = req.body;
  registerUser({ fullName, email, password, role})
    .then((result) => {
      const { statusCode = 200, message, data, token } = result;
      res.status(statusCode).send({ message, data, token });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};
