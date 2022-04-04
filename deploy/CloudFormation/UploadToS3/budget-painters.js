const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

// LAMBDA ARREGLADA RAUL
async function queryItems(tabla, valor, element) {
  var params = {
    TableName: tabla,
    KeyConditionExpression:
      "#partitionKeyName = :partitionkeyval AND #sortKeyName = :sortkeyval",
    ExpressionAttributeValues: {
      ":partitionkeyval": element,
      ":sortkeyval": valor,
    },
    ExpressionAttributeNames: {
      "#partitionKeyName": "element",
      "#sortKeyName": "id",
    },
  };

  const data = await dynamo.query(params).promise();
  if (data.Items[0] == undefined) {
    console.log(valor);
    let msg = `item with id: ${valor} not found ${data.Items}`;
    throw new Error(msg);
  } else {
    return data.Items[0];
  }
}

function verify(value) {
  if (value <= 0 || isNaN(value)) {
    let msg = `The value ${value} is invalid`;
    throw new Error(msg);
  }
}

exports.handler = async (event, context) => {
  try {
    const statusCode = 200;
    let data = event.item;
    let budget = 0;

    for (let house of data) {
      let tmpBudget = 0;
      for (let material of house.materials) {
        verify(material.amount);

        let materialDB = await queryItems("materials", material.id, "material");
        tmpBudget += materialDB.price * material.amount;
      }

      for (let paint of house.paints) {
        verify(paint.surface);

        let pinturaBD = await queryItems("paints", paint.id, "paint");
        tmpBudget += (paint.surface / pinturaBD.efficiency) * pinturaBD.price;
      }

      tmpBudget *= house.numberofhouses;

      tmpBudget *= 1 + house.benefits / 100;

      budget += tmpBudget;

      budget = Math.round(budget * 100) / 100;
    }

    return {
      statusCode,
      budget: budget,
    };
  } catch (err) {
    return {
      statusCode: 405,
      Error: err.toString(),
    };
  }
};