import counterModel from "../models/counterModel.js";
import { handleDbErrors } from "../helpers/dbUtility.js";
// ======================== COUNTER MODEL =========================== //
const createCounter = async (data, res) => {
  try {
    const counterData = new counterModel(data);
    await counterData.save();
    return counterData;
  } catch (e) {
    handleDbErrors(res, e);
  }
};

const updateCounter = async (collectionName, res) => {
  try {
    const counterFilter = {
      collectionName,
    };

    const updateData = {
      $inc: {
        idCounter: 1,
      },
    };

    const { idCounter } = await counterModel.findOneAndUpdate(counterFilter, updateData, {
      new: true,
    });
    return idCounter;
  } catch (e) {}
};

export { createCounter, updateCounter };
