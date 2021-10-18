const AWS = require('aws-sdk')

const api = new AWS.ApiGatewayManagementApi({
  endpoint: 'xa4h4ybrc6.execute-api.us-east-1.amazonaws.com/dev'
})

module.exports.socket = async (event) => {
    console.log('Message event:', event)
    
    const data = JSON.parse(event.body);
    console.log('data', data);
    const connectionId = data.ConnectionId
    const msg = data.msg
    
    await replyToMessage(msg, connectionId)
    return {
        statusCode: 200
    }
}

async function replyToMessage(response, connectionId) {
    const data = { message: response }
    const params = {
      ConnectionId: connectionId,
      Data: JSON.stringify(data)
    }
    return api.postToConnection(params).promise()
}