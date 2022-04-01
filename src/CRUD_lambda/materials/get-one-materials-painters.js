const AWS = require("aws-sdk");

const DYNAMO = new AWS.DynamoDB.DocumentClient();

const TABLE_DYNAMODB = "materials";

var statusCode;

async function queryItems(id) {
  var params = {
    TableName: TABLE_DYNAMODB,
    KeyConditionExpression:
      "#partitionKeyName = :partitionkeyval AND #sortKeyName = :sortkeyval",
    ExpressionAttributeValues: {
      ":partitionkeyval": "material",
      ":sortkeyval": id,
    },
    ExpressionAttributeNames: {
      "#partitionKeyName": "element",
      "#sortKeyName": "id",
    },
  };

  let data = await DYNAMO.query(params).promise();

  if (data.Count == 0) {
    statusCode = 404;
    let msg = `Material with id: ${id} not found`;
    throw new Error(msg);
  }

  data = data.Items[0];
  return data;
}

function verify(value) {
  if (value <= 0 || isNaN(value)) {
    statusCode = 400;
    let msg = `The id ${value} is invalid`;
    throw new Error(msg);
  }
}

exports.handler = async (event, context) => {
  var body;
  statusCode = 200;

  try {
    let id = event.id;
    verify(id);

    body = await queryItems(id);

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
