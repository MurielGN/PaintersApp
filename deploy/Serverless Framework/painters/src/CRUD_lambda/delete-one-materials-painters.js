const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_DYNAMODB = "materials";

var status;
var msg;


function verify(value) {
  if (value <= 0 || isNaN(value) || value == undefined) {
    status = 400;
    msg = `The id ${value} is invalid`;
    throw new Error(msg);
  }
  return value;
}

exports.handler = async (event, context) => {
  let body;
  status = 200;
  
  let {id} = event.pathParameters
  id = parseInt(id);
  verify(id);
  
  
  try {

    body = await dynamo.delete({ 
      TableName: TABLE_DYNAMODB,
      ReturnValues: "ALL_OLD",
      Key: {
        element: 'material',
        id: id
      }
    }).promise();
    
    if(body.Attributes == undefined){
      status = 404;
      msg = `Material with id: ${event.id} not found`;
      throw new Error(msg);
    }
    
      return {
      status,
      body
    };
  
  } catch (err) {
    return {
      status,
      Error: err.toString(),
    };
  }

}
