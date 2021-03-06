const AWS = require("aws-sdk");

const DYNAMO = new AWS.DynamoDB.DocumentClient();

const TABLE_DYNAMODB = "materials";

var statusCode;

async function queryItems(filterStarWith) {
  var params = {
    TableName: TABLE_DYNAMODB,

    KeyConditionExpression: "#partitionKeyName = :partitionkeyval",
    FilterExpression: "begins_with (#starWith, :substr)",
    ExpressionAttributeValues: {
      ":partitionkeyval": "material",
      ":substr": filterStarWith,
    },
    ExpressionAttributeNames: {
      "#partitionKeyName": "element",
      "#starWith": "name",
    },
  };

  try {
    const data = await DYNAMO.query(params).promise();

    if (data.Count == 0) {
      statusCode = 404;
      let msg = `Materials name starting with: ${filterStarWith} not found`;
      throw new Error(msg);
    }

    return data.Items;
  } catch (err) {
    return err;
  }
}

exports.handler = async (event, context) => {
  let body;
  statusCode = 200;

  try {
    let filterStarWith = event.expression;
    if (typeof filterStarWith !== "string" || filterStarWith === "") {
      statusCode = 400;
      let msg = `Expression: ${filterStarWith} is invalid`;
      throw new Error(msg);
    }

    body = await queryItems(filterStarWith);

    return {
      statusCode,
      body,
    };
  } catch (err) {
    return {
      statusCode,
      Error: err.toString(),
    };
  }
};
