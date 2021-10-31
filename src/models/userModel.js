import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "email is already present"],
    lowercase: true,
    required: [true, "email required"],
  },
  userId: {
    type: Number,
    unique: true,
    required: [true, "userId required"],
  },
  status: {
    type: String,
    uppercase: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  //this refers to the document being saved

  const user = this;
  this.createdAt = Date.now();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
