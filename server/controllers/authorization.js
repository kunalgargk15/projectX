const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  //   console.log(req.headers);

  try {
    const token = await req.headers.authorization;
    // console.log(token);

    const decodedToken = jwt.verify(token, "RANDOM-TOKEN");

    req.user = decodedToken;
    next();
  } catch (err) {
    res.send({
      message: "Error in authorization",
      err,
    });
  }
};
