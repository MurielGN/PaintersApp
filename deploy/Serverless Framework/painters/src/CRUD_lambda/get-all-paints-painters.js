const AWS = require("aws-sdk");

const DYNAMO = new AWS.DynamoDB.DocumentClient();

const TABLE_DYNAMODB = "materials";

var statusCode;


<<<<<<< HEAD:deploy/Serverless Framework/painters/src/CRUD_lambda/get-all-paints-painters.js
async function queryItems(){
=======
async function queryItems(id){
  
>>>>>>> a71c4df5ea6662d6913b920f6bdbad1e27559696:src/CRUD_lambda/get-one-materials-painters.js
  var params = {
    TableName: TABLE_DYNAMODB,
    KeyConditionExpression: '#partitionKeyName = :partitionkeyval AND #sortKeyName = :sortkeyval',
    ExpressionAttributeValues: { ':partitionkeyval': 'material', ':sortkeyval': id},
    ExpressionAttributeNames: { '#partitionKeyName': 'element', '#sortKeyName': 'id'},
  }
  
    let data = await DYNAMO.query(params).promise();
    
<<<<<<< HEAD:deploy/Serverless Framework/painters/src/CRUD_lambda/get-all-paints-painters.js
    KeyConditionExpression: '#partitionKeyName = :partitionkeyval',

    ExpressionAttributeValues: { ':partitionkeyval': 'paint' },
    ExpressionAttributeNames: { '#partitionKeyName': 'element' }
  }
=======
    if(data.Count == 0){
      statusCode = 404;
      throw new Error("Material with id: ${id} not found");
    }
    
    data = data.Items[0]
    return data
>>>>>>> a71c4df5ea6662d6913b920f6bdbad1e27559696:src/CRUD_lambda/get-one-materials-painters.js
  
}

function verify(value) {
  if (value <= 0 || isNaN(value)) {
    statusCode = 400;
    throw new Error("The id ${value} is invalid");
  }
}


exports.handler = async (event, context) => {
<<<<<<< HEAD:deploy/Serverless Framework/painters/src/CRUD_lambda/get-all-paints-painters.js
  let body;
  let status = 200;
  
  body = await queryItems();
  
    return {
    status,
    body,

  };
=======
  var body;
  statusCode = 200;

  try {
    
    let id = event.id;
    verify(id);
    
    body = await queryItems(id);
    
    return {
      statusCode,
      body
    };
  
  } catch (err) {
        return {
      statusCode,
      Error: err.toString(),
    };
  }
>>>>>>> a71c4df5ea6662d6913b920f6bdbad1e27559696:src/CRUD_lambda/get-one-materials-painters.js

}
