import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { responseToSend } from "../helpers/response.js";
import { readUser } from "../services/userService.js";

dotenv.config();

const { ACCESS_TOKEN_SECRET } = process.env;
const verifyAuthToken = async (req, res, next) => {
  try {
    const token = req.signedCookies["cookie-token"];
    const verifiedData = jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedData) => {
      if (err) return false; // Todo:- remove the expired token for the user

      return decodedData;
    });

    if (!verifiedData) throw new Error("Session Expired");
    //SELECT USER WHERE USER ID= VALUE AND TOKEN IS PRESENT
    //IN TOKEN ARRAY
    const userFilter = {
      userId: verifiedData.userId,
      status: "ACTIVATED",
    };

    const select = {
      _id: 0,
      password: 0,
    };

    const profile = await readUser(userFilter, select, res);
    if (!profile) throw new Error("User Not Found");
    /* profile.mobile = decryptData(profile.mobile);
    profile.email = decryptData(profile.email); */
    req.loggedInUser = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      userId: profile.userId,
      token,
    };

    next();
  } catch (e) {
    responseToSend(res, 401, 0, e.message, null);
  }
};

export { verifyAuthToken };
