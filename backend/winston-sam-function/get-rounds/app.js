var AWS = require("aws-sdk");
const dotenv = require("dotenv").config();

let response;

console.log(
  "🚀 ~ file: app.js ~ line 9 ~  process.env.AWS_SECRET_ACCESS_KEY",
  process.env.AWS_SECRET_ACCESS_KEY
);
console.log(
  "🚀 ~ file: app.js ~ line 9 ~ process.env.AWS_ACCESS_KEY_ID",
  process.env.AWS_ACCESS_KEY_ID
);

AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var dynamo = new AWS.DynamoDB.DocumentClient();

const getRoundsForUser = async (user) => {
  let keys = [];
  console.log("CREATING A LIST OF ALL FRIENDS POSTS IN CHRONOLOGICAL ORDEER");

  const queryParams5 = {
    TableName: "winston",
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk) ",
    ExpressionAttributeValues: {
      ":pk": `USER#${user}`,
      ":sk": "#FRIEND"
    },
    ScanIndexForward: true
  };

  try {
    const followingUsers = await dynamo.query(queryParams5).promise();
    console.log(
      "🚀 ~ file: main.js ~ line 85 ~ getRoundsForUser ~ followingUsers",
      followingUsers
    );

    // const res4 = await dynamodb.query(queryParams4).promise();
    const followingUserRounds = await new Promise((resolve, reject) => {
      followingUsers.Items.forEach(async (item, index, array) => {
        console.log(
          "🚀 ~ file: main.js ~ line 90 ~ res9.Items.forEach ~ item",
          item
        );
        const userItem = await dynamo
          .query({
            TableName: "winston",
            KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
            ExpressionAttributeValues: {
              ":pk": `USER#${item["followedUser"]}`,
              ":sk": "ROUND#"
            },
            ScanIndexForward: true
          })
          .promise();

        console.log(
          "🚀 ~ file: main.js ~ line 97 ~ res4.Items.forEach ~ userItem.Items",
          userItem.Items
        );
        userItem.Items.forEach((x) => keys.push(x));
        if (index === array.length - 1) resolve(keys);
      });
    }).then((res) => {
      console.log(
        "🚀 ~ file: app.js ~ line 70 ~ followingUserRounds ~ res",
        res
      );
      console.log("FINAL FOLLOWING LIST", keys);
      return keys;
    });
    console.log("returning followingUserRounds");
    console.log(
      "🚀 ~ file: app.js ~ line 82 ~ getRoundsForUser ~ followingUserRounds",
      followingUserRounds
    );
    return followingUserRounds;
  } catch (err) {
    console.log("ERROR", err.message);
  }
};

exports.lambdaHandler = async (event, context) => {
  const user = event.queryStringParameters.user;

  const rounds = await getRoundsForUser(user);
  console.log(
    "🚀 ~ file: app.js ~ line 79 ~ exports.lambdaHandler= ~ rounds",
    rounds
  );

  response = {
    isBase64Encoded: false,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  };

  if (Object.keys(rounds).length > 0) {
    response.statusCode = 200;
    response.body = JSON.stringify(rounds);
  } else {
    response.statusCode = 500;
    response.body = {
      error: "something happened"
    };
  }

  return response;
};
