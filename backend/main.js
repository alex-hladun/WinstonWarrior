var AWS = require("aws-sdk");
const { mockData } = require("./data");
const arg = process.argv[2]

AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();

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

  case "READ":
    const queryParams = {
      TableName: "winston",
      KeyConditionExpression: "PK = :pk AND SK < :rounds",
      ExpressionAttributeValues: {
        ":pk": { S: "USER#alexhladun" },
        // ":metadata": { S: "#METADATA#alexhladun" },
        ":rounds": { S: "ROUND$" }
      },
      ScanIndexForward: true,
    };
    const res = dynamodb.query(queryParams, (err, res) => {
      if (err) {
        console.log("insert err", err);
      } else {
        console.log("read OK", res);
      }
    });
}
