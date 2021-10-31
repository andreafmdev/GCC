import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { ACCESS_TOKEN_SECRET } = process.env;

const generateToken = async (res, tokenData) => {
  const token = jwt.sign(tokenData, ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
  return token;
};

export { generateToken };
