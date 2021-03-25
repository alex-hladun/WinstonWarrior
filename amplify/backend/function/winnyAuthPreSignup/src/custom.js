var AWS = require("aws-sdk");

var dynamo = new AWS.DynamoDB.DocumentClient();
dynamo.update({
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

exports.handler = async (event, context, callback) => {
  // insert code to be executed by your lambda trigger

  console.log("🚀 ~ file: custom.js ~ line 11 ~ context", context);
  console.log("🚀 ~ file: custom.js ~ line 11 ~ event", event);
  // insert code to be executed by your lambda trigger
  const username = event.userName;
  console.log(
    "🚀 ~ file: custom.js ~ line 13 ~ insertUseer ~ username",
    username
  );
  const email = event.request.userAttributes.email;
  console.log("🚀 ~ file: custom.js ~ line 14 ~ insertUseer ~ email", email);

  const res = await dynamo
    .put({
      TableName: "winston",
      Item: {
        PK: `USER#${username}`,
        SK: `#METADATA#${username}`,
        username,
        ContentType: "profile",
        email,
        timestamp: Date.now()
      }
    })
    .promise();
  console.log("🚀 ~ file: custom.js ~ line 33 ~ exports.handler= ~ res", res);

  event.response.autoConfirmUser = true;
  event.response.autoVerifyEmail = true;
  callback(null, event);
};
