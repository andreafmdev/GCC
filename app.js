import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/userRoutes.js";
import counterRouter from "./src/routes/counterRoutes.js";
import "./src/database/mongoose.js";
const app = express();
const port = 3020;

app.use(cookieParser("secret"));
app.use(express.json());

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

app.use("/api/users", userRouter);
//DEV
app.use("/dev/counters", counterRouter);
