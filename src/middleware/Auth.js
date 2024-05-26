import jwt from "jsonwebtoken";
import User from "../models/user.models";

const Auth = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "You are not logged in, please login",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await User.findById(decoded.id);

    if (!loggedInUser) {
      return res.status(40).json({
        status: "Failed",
        message: "Token has expired, please login again",
      });
    }

    req.User = loggedInUser;
    next();
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

export default Auth;
