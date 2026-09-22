import User from "../models/UserModel.js";
import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken";

export const userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false, message:"No token provided"})
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
        console.log(err.message)
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) {
        req.user = data;
        return res.json({ status: true, user: user.username, userId: data.id })
      }
      else return res.json({ status: false })
    }
  })
}
export const authmiddleware = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false, message:"No token provided"})
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    // Attach user info to request
    req.user = { id: user._id, username: user.username };

    // Pass control to the next handler
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
}