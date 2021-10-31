/* @description */
import { handleDbErrors } from "../helpers/dbUtility.js";
import userModel from "../models/userModel.js";
//getters -> Access Propriety
//setteres -> edit Propriety

const createUser = async (data, res) => {
  try {
    const userData = new userModel(data);
    await userData.save();
    return userData;
  } catch (e) {
    handleDbErrors(res, e);
  }
};

const readUser = async (filter, select, res) => {
  try {
    const userData = await userModel.findOne(filter).select(select);
    return userData;
  } catch (error) {
    handleDbErrors(res, e);
  }
};

const readAllUser = async (filter, select, res) => {
  try {
    const userData = await userModel.find(filter).select(select);
    return userData;
  } catch (error) {
    handleDbErrors(res, e);
  }
};
export { createUser, readUser, readAllUser };
