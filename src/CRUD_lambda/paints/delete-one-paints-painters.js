const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_DYNAMODB = "paints";

var statusCode;

function verify(value) {
  if (value <= 0 || isNaN(value) || value == undefined) {
    statusCode = 400;
    let msg = `The id ${value} is invalid`;
    throw new Error(msg);
  }
  return value;
}

exports.handler = async (event, context) => {
  let body;
  statusCode = 200;

  try {
    body = await dynamo
      .delete({
        TableName: TABLE_DYNAMODB,
        ReturnValues: "ALL_OLD",
        Key: {
          element: "paint",
          id: verify(event.id),
        },
      })
      .promise();

    if (body.Attributes == undefined) {
      statusCode = 404;
      let msg = `Paint with id: ${event.id} not found`;
      throw new Error(msg);
    }

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
