const AWS = require("aws-sdk");

const DYNAMO = new AWS.DynamoDB.DocumentClient();

const TABLE_DYNAMODB = "materials";

var status;
var msg;


async function queryItems(expression){
  var params = {
    TableName: TABLE_DYNAMODB,
    
    KeyConditionExpression: '#partitionKeyName = :partitionkeyval',
    FilterExpression: 'begins_with (#starWith, :substr)',
    ExpressionAttributeValues: { ':partitionkeyval': 'material', ':substr': expression},
    ExpressionAttributeNames: { '#partitionKeyName': 'element', '#starWith': 'name' },
  }
  

    const data = await DYNAMO.query(params).promise();
    
    if(data.Count == 0){
      status = 404;
      msg = `Materials name starting with: ${expression} not found`;
      throw new Error(msg);
    }
    
    return data.Items
  
}


exports.handler = async (event, context) => {
  let body;
  status = 200;

  try {
    
    let {expression} = event.pathParameters
    if(typeof expression !== "string" || expression === ""){
      status = 400;
      msg = `Expression: ${expression} is invalid`;
      throw new Error(msg);
    }
    
    body = await queryItems(expression);
    
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
