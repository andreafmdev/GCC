import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Category Name is Required"],
  },
  description: {
    type: String,
  },
  field: {
    textBox: {
      type: Boolean,
      default: false,
    },
    upload: {
      fileType: {
        type: Array,
        default: [],
        uppercase: true,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
  },
  categoryId: {
    //
    type: Number,
    required: [true, "categoryId is required"],
  },
  baseId: {
    type: Number,
    unique: true,
    required: true,
  },
  contentId: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    uppercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const categoryModel = mongoose.model("categories", categorySchema);
export default categoryModel;
