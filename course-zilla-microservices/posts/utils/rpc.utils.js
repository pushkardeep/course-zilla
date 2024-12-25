const rpcProducer = require("../services/rabbitMq/producers/rpc.producer");
const rpcConsumer = require("../services/rabbitMq/consumers/rpc.consumers");

const sendRpcRequest = async (sendToQueue, data) => {
  try {
    const { listenToQueue, channel } = await rpcProducer(sendToQueue, data);
    const response = await rpcConsumer(listenToQueue, channel);

    return { success: true, response };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = sendRpcRequest;
