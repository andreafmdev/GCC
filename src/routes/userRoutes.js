import express from "express";
import { signUp, getUser, getAllUser, login } from "../controllers/userController.js";
import { verifyAuthToken } from "../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
  //controller function
  signUp(req, res);
});
userRouter.post("/login", (req, res) => {
  login(req, res);
});
userRouter.post("/getUser", verifyAuthToken, (req, res) => {
  console.log(req.loggedInUser);
  console.log("Cookies: ", req.cookies);
  console.log("Signed Cookies: ", req.signedCookies);
  // getUser(req, res);
});

userRouter.post("/getAllUser", (req, res) => {
  getAllUser(req, res);
});

export default userRouter;
