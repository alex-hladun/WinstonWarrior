exports.handler = (event, context, callback) => {
  // insert code to be executed by your lambda trigger

  event.response.autoConfirmUser = true;
  event.response.autoVerifyEmail = true;
  callback(null, event);
};
