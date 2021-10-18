const AWS = require("aws-sdk");

module.exports.socket = async (event) => {
    console.log(event, "Connect Event")
    
    const USERS_TABLE = process.env.USERS_TABLE;
    const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

    const route = event.requestContext.routeKey
    const connectionId = event.requestContext.connectionId

    const params = {
      TableName: USERS_TABLE,
      Item: {
        userId: connectionId,
        route: route,
      },
    };
    
    try {
      await dynamoDbClient.put(params).promise();
    } catch (error) {
      console.log(error);
    }
    return {
        statusCode: 200
    }
}