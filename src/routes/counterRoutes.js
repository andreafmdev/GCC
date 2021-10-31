import express from "express";
import { createCounter } from "../services/counterService.js";
const counterRouter = express.Router();

counterRouter.post("/generateCounter", async (req, res) => {
  try {
    const counterData = await createCounter(req.body, res);
    res.send(counterData);
  } catch (e) {
    console.log("=== Counter Route ==", e);
  }
});

export default counterRouter;
