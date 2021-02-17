// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const faker = require("faker");

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  console.log(
    "🚀 ~ file: app.js ~ line 18 ~ exports.lambdaHandler= ~ context",
    context
  );
  console.info("EVENT\n" + JSON.stringify(event, null, 2))
  console.log("ENVIRONMENT VARIABLES\n" + JSON.stringify(process.env, null, 2));
  try {
    // const ret = await axios(url);
    const fake = faker.helpers.createCard();
    const fakeText = JSON.stringify(fake);
    response = {
      statusCode: 200,
      body: fakeText
      // location: ret.data.trim()
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
