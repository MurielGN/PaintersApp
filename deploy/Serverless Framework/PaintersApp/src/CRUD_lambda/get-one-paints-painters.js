const AWS = require("aws-sdk");

const DYNAMO = new AWS.DynamoDB.DocumentClient();

const TABLE_DYNAMODB = "paints";

var status;
var msg;


async function queryItems(id){
  
  var params = {
    TableName: TABLE_DYNAMODB,
    KeyConditionExpression: '#partitionKeyName = :partitionkeyval AND #sortKeyName = :sortkeyval',
    ExpressionAttributeValues: { ':partitionkeyval': 'paint', ':sortkeyval': id},
    ExpressionAttributeNames: { '#partitionKeyName': 'element', '#sortKeyName': 'id'},
  }
  
    let data = await DYNAMO.query(params).promise();
    
    if(data.Count == 0){
      status = 404;
      msg = `Paint with id: ${id} not found`;
      throw new Error(msg);
    }
    
    data = data.Items[0]
    return data
  
}

function verify(value) {
  if (value <= 0 || isNaN(value)) {
    status = 400;
    msg = `The id ${value} is invalid`;
    throw new Error(msg);
  }
}


exports.handler = async (event, context) => {
  var body;
  status = 200;

  try {
    
    let {id} = event.pathParameters;
    id = parseInt(id);
    verify(id);

    body = await queryItems(id);
    
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
