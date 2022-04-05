const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

var params;

const TABLE_DYNAMODB = "materials";
const NAME_PK_ARROW = "material";
const NUMBER_COLUMNS = 3;
const NAMES_COLUMSN = { "id":"number", "name":"string","price":"number"};

var status;
var msg;

function verify(value) {
  
  if (Object.keys(value).length != NUMBER_COLUMNS) {
    status = 405;
    msg = `The id ${value} is invalid`;
    throw new Error(msg);
  }
  
  for(let key of Object.keys(value)){
    
    if(Object.keys(NAMES_COLUMSN).indexOf(key) == -1){
      status = 405;
      msg = `Item ${JSON.stringify(value)} is invalid`;
      throw new Error(msg);
    }    
    
    if(typeof value[key] !== NAMES_COLUMSN[key]){
      status = 405;
      msg = `${key}: ${value[key]} is not a ${NAMES_COLUMSN[key]}`;
      throw new Error(msg);
    }
    
  }
  
  return value;
}

function verifyId(value) {
  if (value <= 0 || isNaN(value) || value === undefined) {
    status = 400;
    msg = `The id: ${value} is invalid`;
    throw new Error(msg);
  }
  
  return value;
}


exports.handler = async (event, context) => {
  let body;
  status = 200;
  
  try {
    let { id, price, name } = JSON.parse(event.body);
    let data = {"id": id, "name": name, "price": price};    
    verify(data);
  
    if(delete id){
      let {id} = event.pathParameters
    }
    id = parseInt(id);
    verifyId(id);
    
    if( data.id != id){
        status = 405;
        msg = `id: ${id} and data.id: ${data.id} dont match`;
        throw new Error(msg);
    }
  
    params = {
      TableName: TABLE_DYNAMODB,
      Item: {
          element: NAME_PK_ARROW,
          id:      data.id,
          name:    data.name,
          price:   data.price
      },
    };
    
    body = await dynamo
            .put(params)
            .promise();
    body = `Put item ${data.id}`;
    
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
