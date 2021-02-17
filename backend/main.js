var AWS = require("aws-sdk");
const { mockData } = require("./data");
// const dotenv = require("dotenv").config({ path: "../.ENV" });
const arg = process.argv[2];


AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();
var dynamo = new AWS.DynamoDB.DocumentClient();

const user = "alexhladun";
var params = {
  TableName: "winston",
  KeySchema: [
    { AttributeName: "PK", KeyType: "HASH" }, //Partition key
    { AttributeName: "SK", KeyType: "RANGE" } //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "PK", AttributeType: "S" },
    { AttributeName: "SK", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

var updateParams = {
  TableName: "winston",
  AttributeDefinitions: [
    { AttributeName: "PK", AttributeType: "S" },
    { AttributeName: "SK", AttributeType: "S" }
  ],
  GlobalSecondaryIndexUpdates: [
    {
      Create: {
        IndexName: "InvertedIndex",
        KeySchema: [
          { AttributeName: "SK", KeyType: "HASH" },
          { AttributeName: "PK", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      }
    }
  ]
};

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
    console.log("🚀 ~ file: main.js ~ line 85 ~ getRoundsForUser ~ followingUsers", followingUsers)

    // const res4 = await dynamodb.query(queryParams4).promise();
    await new Promise((resolve, reject) => {
      followingUsers.Items.forEach(async (item, index, array) => {
        console.log("🚀 ~ file: main.js ~ line 90 ~ res9.Items.forEach ~ item", item)
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
        if (index === array.length - 1) resolve();
      });
    }).then(() => {
      console.log("FINAL FOLLOWING LIST", keys);
    });
  } catch (err) {
    console.log("ERROR", err.message);
  }
};

switch (arg) {
  case "CREATE":
    dynamodb.createTable(params, function (err, data) {
      if (err) {
        console.error(
          "Unable to create table. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log(
          "Created table. Table description JSON:",
          JSON.stringify(data, null, 2)
        );
      }
    });
    break;
  case "CREATESECONDARY":
    dynamodb.updateTable(updateParams, function (err, data) {
      if (err) {
        console.error(
          "Unable to create table. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log(
          "Updated table. Table description JSON:",
          JSON.stringify(data, null, 2)
        );
      }
    });
    break;
  case "DELETE":
    dynamodb.deleteTable(
      {
        TableName: "winston"
      },
      function (err, data) {
        if (err) {
          console.error(
            "Unable to delete table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log(
            "Deleted table. Table description JSON:",
            JSON.stringify(data, null, 2)
          );
        }
      }
    );
    break;
  case "MOCK":
    // console.log(mockData);
    mockData.forEach((data) => {
      // console.log("data", data);
    });
    const formattedRequest = {
      RequestItems: {
        winston: mockData.map((item) => {
          let obj = {};
          Object.keys(item).forEach((key) => {
            console.log(
              "🚀 ~ file: main.js ~ line 166 ~ res4.Items.forEach ~ userItem.Items",
              userItem.Items
            );
            if (key === "stats") {
              obj[key] = {
                M: {
                  course: {
                    S: item[key].course
                  },
                  frontScore: {
                    N: item[key].frontScore
                  },
                  backScore: {
                    N: item[key].backScore
                  },
                  eagles: {
                    N: item[key].eagles
                  },
                  birdies: {
                    N: item[key].birdies
                  },
                  pars: {
                    N: item[key].pars
                  },
                  bogeys: {
                    N: item[key].bogeys
                  },
                  doubles: {
                    N: item[key].doubles
                  },
                  triples: {
                    N: item[key].triples
                  },
                  holesPlayed: {
                    N: item[key].holesPlayed
                  },
                  gir: {
                    N: item[key].gir
                  },
                  scr: {
                    N: item[key].scr
                  }
                }
              };
            } else {
              obj[key] = {
                S: item[key]
              };
            }
          });

          return {
            PutRequest: { Item: obj }
          };
        })
      }
    };

    dynamodb.batchWriteItem(formattedRequest, (err, res) => {
      if (err) {
        console.log("insert err", err);
      } else {
        console.log("insert OK", res);
      }
    });
    break;
  case "READINVERT":
    const queryParams = {
      TableName: "winston",
      KeyConditionExpression: "PK = :pk AND SK < :rounds",
      ProjectionExpression: "stats",
      ExpressionAttributeValues: {
        ":pk": { S: `USER#${user}` },
        // ":metadata": { S: "#METADATA#alexhladun" },
        ":rounds": { S: "ROUND$" }
      },
      ScanIndexForward: true
    };
    const res = dynamodb.query(queryParams, (err, res) => {
      if (err) {
        console.log("insert err", err);
      } else {
        console.log("read OK", JSON.stringify(res.Items));
      }
    });
    break;
  case "READ2":
    // Data is round and all reactions
    let timestamp = "2020-12-11T02:21:02";
    let userRead2 = "alexhladun";
    console.log(
      "READING ALL REACTIONS AND THE DETAILS FOR A GIVEN Round",
      timestamp
    );
    const queryParams2 = {
      TableName: "winston",
      IndexName: "InvertedIndex",
      KeyConditionExpression: "SK = :sk AND begins_with(PK, :reactions)",
      ExpressionAttributeValues: {
        ":sk": { S: `ROUND#${userRead2}#${timestamp}` },
        // ":user": { S: `${userRead2}$` },
        ":reactions": { S: "REACTION" }
      },
      ScanIndexForward: true
    };
    const res2 = dynamodb.query(queryParams2, (err, res) => {
      if (err) {
        console.log("read err", err);
      } else {
        res.Items.forEach((item) => {
          console.log(`${JSON.stringify(item)}`);
        });
        // console.log("read OK", JSON.stringify(res.Items));
      }
    });
    break;
  case "READ3":
    // Data is round and all reactions
    const queryParams3 = {
      TableName: "winston",
      IndexName: "InvertedIndex",
      KeyConditionExpression: "SK = :sk",
      ExpressionAttributeValues: {
        ":sk": { S: `#FRIEND#${user}` }
      },
      ScanIndexForward: true
    };

    const res3 = dynamodb.query(queryParams3, (err, data) => {
      if (err) {
        console.log("err", err);
      } else {
        console.log("data", data);
        let keys = [];
        data.Items.forEach((item) => {
          keys.push({
            PK: { S: `USER#${item["followingUser"]["S"]}` },
            SK: { S: `#METADATA#${item["followingUser"]["S"]}` }
          });
          const friends = dynamodb.batchGetItem(
            {
              RequestItems: {
                winston: {
                  Keys: keys
                }
              }
            },
            (err, res8) => {
              if (err) console.log("err", err);
              if (res8) {
                res8.Responses.winston.forEach((i) => {
                  console.log("ENRICHED ITEM", i);
                });
              }
            }
          );
        });
      }
    });
  case "READ4":
    getRoundsForUser(user);
}
