import { responseToSend } from "../helpers/response.js";
const handleDbErrors = (res, error) => {
  if (error.code === 11000) {
    return responseToSend(res, 400, 0, "Data Already exists", null);
  }
  responseToSend(res, 400, 0, error.message, null);
};

export { handleDbErrors };
