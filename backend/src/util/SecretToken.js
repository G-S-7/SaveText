import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const createSecretToken = (id) => {
  try{
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
}catch(error){
    console.log(error.message)
}
};