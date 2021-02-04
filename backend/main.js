var AWS = require("aws-sdk");
const { mockData } = require("./data");
const arg = process.argv[2];
console.log("🚀 ~ file: main.js ~ line 4 ~ arg", arg);

AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();
const user = "JerryGolf";
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
          console.log(
            "🚀 ~ file: main.js ~ line 63 ~ builtObj ~ builtObj",
            obj
          );

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
    console.log(
      "READING ALL REACTIONS AND THE DETAILS FOR A GIVEN PHOTO",
      timestamp
    );
    const queryParams2 = {
      TableName: "winston",
      IndexName: "InvertedIndex",
      KeyConditionExpression: "SK = :sk AND PK BETWEEN :reactions AND :user",
      ExpressionAttributeValues: {
        ":sk": { S: `ROUND#${user}#${timestamp}` },
        ":user": { S: `${user}$` },
        ":reactions": { S: "REACTION#" }
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
          console.log("🚀 ~ file: main.js ~ line 247 ~ item", item);
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
                console.log(
                  "🚀 ~ file: main.js ~ line 264 ~ data.Items.forEach ~ res8",
                  res8
                );
                res8.Responses.winston.forEach((i) => {
                  console.log("ENRICHED ITEM", i);
                });
              }
            }
          );
        });
      }
    });
    console.log("🚀 ~ file: main.js ~ line 244 ~ res3", res3.Items);
  case "READ4":
    console.log("CREATING A LIST OF ALL FRIENDS POSTS IN CHRONOLOGICAL ORDEER");
    // Data is round and all reactions
    const queryParams4 = {
      TableName: "winston",
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk) ",
      ExpressionAttributeValues: {
        ":pk": { S: `USER#${user}` },
        ":sk": { S: "#FRIEND" }
      },
      ScanIndexForward: true
    };

    const res4 = dynamodb.query(queryParams4, (err, data) => {
      if (err) {
        console.log("err", err);
      } else {
        console.log("LIST OF PEOPLE USER FOLLOWS", data);
        data.Items.forEach((i) => console.log("user", i));
        let keys = [];
        data.Items.forEach((item) => {
          console.log("🚀 ~ file: main.js ~ line 247 ~ item", item["followedUser"].S);
          keys.push({
            PK: { S: `USER#${item["followedUser"]["S"]}` },
            SK: { S: `#ROUND` }
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
                console.log(
                  "🚀 ~ file: main.js ~ line 264 ~ data.Items.forEach ~ res8",
                  res8
                );
                res8.Responses.winston.forEach((i) => {
                  console.log("ENRICHED ITEM", i);
                });
              }
            }
          );
        });
      }
    });
  // console.log("🚀 ~ file: main.js ~ line 244 ~ res3", res3.Items);
}
