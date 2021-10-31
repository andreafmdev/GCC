import express from "express";
import validator from "validator";
import { addCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();
categoryRouter.post("/addCategory", (req, res) => {
  addCategory(req, res);
});
export default categoryRouter;
