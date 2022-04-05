const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

var params;

const TABLE_DYNAMODB = "paints";
const NAME_PK_ARROW = "paint";
const NUMBER_COLUMNS = 4;
const NAMES_COLUMSN = {
  id: "number",
  efficiency: "number",
  price: "number",
  type: "string",
};

var statusCode;

function verify(value) {
  if (Object.keys(value).length != NUMBER_COLUMNS) {
    statusCode = 405;
    let msg = `The id ${value} is invalid`;
    throw new Error(msg);
  }

  for (let key of Object.keys(value)) {
    if (Object.keys(NAMES_COLUMSN).indexOf(key) == -1) {
      statusCode = 405;
      let msg = `Item ${JSON.stringify(value)} is invalid`;
      throw new Error(msg);
    }

    if (typeof value[key] !== NAMES_COLUMSN[key]) {
      statusCode = 405;
      let msg = `${key}: ${value[key]} is not a ${NAMES_COLUMSN[key]}`;
      throw new Error(msg);
    }
  }

  return value;
}

exports.handler = async (event, context) => {
  let body;
  statusCode = 200;

  try {
    let data = verify(event.item);

    params = {
      TableName: TABLE_DYNAMODB,
      Item: {
        element: NAME_PK_ARROW,
        id: data.id,
        type: data.type,
        price: data.price,
        efficiency: data.efficiency,
      },
    };

    body = await dynamo.put(params).promise();
    body = `Put item ${data.id}`;

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