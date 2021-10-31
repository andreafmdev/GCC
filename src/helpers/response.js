"use strict";

const responseToSend = (res, statusCode, success, message, result) => {
  res.status(statusCode).send({
    success,
    message,
    result,
  });
};

export { responseToSend };
