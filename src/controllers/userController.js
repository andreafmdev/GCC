import { responseToSend } from "../helpers/response.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { updateCounter } from "../services/counterService.js";
import { createUser, readUser, readAllUser } from "../services/userService.js";
import { generateToken } from "../helpers/generateToken.js";

const signUp = async (req, res) => {
  try {
    //CHECK FIELD VALIDATION
    const { firstName, lastName, email } = req.body;
    if (!validator.isEmail(email)) throw new Error("Insert a valid email");

    if (validator.isEmpty(firstName)) throw new Error("Firstname is required");
    if (!validator.isAlpha(firstName, "it-IT", { ignore: " " }))
      throw new Error("Firstname can't contain numbers or special characther");

    if (validator.isEmpty(lastName)) throw new Error("Lastname is required");
    if (!validator.isAlpha(lastName, "it-IT", { ignore: " " }))
      throw new Error("Lastname can't contain numbers or special characther");

    if (validator.isEmpty(password)) throw new Error("Password is required");
    req.body["status"] = "ACTIVATED";

    const userId = await updateCounter("users", res);
    if (!userId) throw new Error("Error in update counter service");
    req.body["userId"] = userId;

    const userData = await createUser(req.body, res);

    if (!userData) throw new Error("Error while inserting user data");
    //OPERATION
    // let resp = await createUser(test);
    //SEND
    responseToSend(res, 200, 1, "result", userData);
  } catch (error) {
    console.log(error);
    responseToSend(res, 400, 0, error.message, null);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    const filter = {
      email,
    };
    const userInfo = await readUser(filter, {}, res);
    console.log(userInfo);
    if (!userInfo) throw new Error("User Not Found,check mail address");
    const passwordMatch = await bcrypt.compare(password, userInfo.password);

    if (!passwordMatch) throw new Error("Check your password");

    const tokenPayload = {
      _id: userInfo._id,
      userId: userInfo.userId,
    };
    const token = await generateToken(res, tokenPayload);
    console.log(token);
    // conxole.log()
    // console.log("Cookies: ", req.cookies);
    // console.log("Signed Cookies: ", req.signedCookies);
    res.cookie("cookie-token", token, { signed: true });
    responseToSend(res, 200, 1, "Logged in", userInfo);
  } catch (error) {
    responseToSend(res, 400, 0, error.message, null);
  }
};
const getUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (validator.isEmpty(email)) throw new Error("Email field is empty");
    if (!validator.isEmail(email)) throw new Error("Insert a valid email");
    const filter = { email };
    const select = {
      _id: 0,
      userId: 0,
      __v: 0,
    };
    const userData = await readUser(filter, select, res);
    responseToSend(res, 200, 1, "User retreived correctly", userData);
    //query select
  } catch (error) {
    responseToSend(res, 400, 0, error.message, null);
  }
};

const getAllUser = async (req, res) => {
  try {
    if (!req.body) throw new Error("Empty parameters");
    const select = {
      _id: 0,
      __v: 0,
    };
    const userData = await readAllUser(req.body, select, res);
    responseToSend(res, 200, 1, "User retreived correctly", userData);
    //query select
  } catch (error) {
    responseToSend(res, 400, 0, error.message, null);
  }
};
export { signUp, getUser, getAllUser, login };
