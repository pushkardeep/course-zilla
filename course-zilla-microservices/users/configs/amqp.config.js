const amqp = require("amqplib");

let connection;

const connectRabbitMq = async () => {
  try {
    const rabbitMq_uri = process.env.RABBITMQ_URI;

    if (!rabbitMq_uri) {
      throw new Error("RABBITMQ_URI is not set in environment variables");
    }

    if (!connection || !connection.isOpen) {
      connection = await amqp.connect(rabbitMq_uri, { heartbeat: 60 });
      console.log("Connected to RabbitMQ");

      connection.on("close", () => {
        console.error("RabbitMQ connection closed. Attempting to reconnect...");
        setTimeout(connectRabbitMq, 5000);
      });

      connection.on("error", (err) => {
        console.error("RabbitMQ connection error:", err.message);
      });
    }

    return connection;
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error.message);
    setTimeout(connectRabbitMq, 5000);
  }
};

module.exports = connectRabbitMq;
