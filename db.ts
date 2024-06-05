import mongoose, { ConnectOptions } from "mongoose";
import getConfig from "next/config";

const connection: any = {};
const { serverRuntimeConfig } = getConfig();

const connectDB = async () => {
  if (connection.isConnected) return;

  await mongoose.connect(
    process.env.MONGO_DB_URI || serverRuntimeConfig.connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  );

  connection.isConnected = mongoose.connection.readyState === 1;
};

export { connectDB };
