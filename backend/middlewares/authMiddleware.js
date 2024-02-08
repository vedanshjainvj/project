import jwt from "jsonwebtoken";
import authModel from "../models/signupuser.js";

const checkIsUserAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      // Verify token
      const { userId } = jwt.verify(token, "please");  // Corrected property name to userId
      // Get User from Token
      req.user = await authModel.findById(userId).select("--password");  // Corrected property name to userId
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

export default checkIsUserAuthenticated;
