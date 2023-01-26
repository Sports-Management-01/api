const sendError = (res, message = "", errorCode = 422) => {
  res.status(errorCode);
  return res.send({
    success: false,
    messages: [message],
  });
};

module.exports = sendError;
