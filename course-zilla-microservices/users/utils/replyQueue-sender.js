const sendToReplyQueue = (channel, replyTo, data) => {
    channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(data)), {
      persistent: true, // Ensure message persistence
    });
    console.log("sending response rpc", data);
  };


  module.exports = sendToReplyQueue;