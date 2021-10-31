import mongoose from "mongoose";

const counterSchema = mongoose.Schema({
  collectionName: {
    type: String,
  },
  idCounter: {
    type: Number,
    default: 0,
  },
});

const counterModel = mongoose.model("counters", counterSchema);
export default counterModel;
