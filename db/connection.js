import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import chalk from "chalk";

dotenv.config()
// let PROD_MONGODB="mongodb+srv://cbrooksie:P8O2mqjzfhjTkgh4@cluster0.slfno6f.mongodb.net/?retryWrites=true&w=majority"
// Get .env working later
const MONGODB_URI = process.env.PROD_MONGODB;

console.log(MONGODB_URI)

// const MONGODB_URI = "mongodb://127.0.0.1:27017/Quotes"

// console.log(MONGODB_URI)
// console.log(process.env.PORT, "here")
  // process.env.ENVIRONMENT === 'prod' ? 
  
//   process.env.DEV_MONGODB;

// Use this MONGODB_URI for now
// const MONGODB_URI = "mongodb+srv://cbrooksie:P8O2mqjzfhjTkgh4@cluster0.slfno6f.mongodb.net/?retryWrites=true&w=majority"
// Uncomment to debug Mongoose queries
// mongoose.set('debug', true)

// This is for Model.findByIdAndUpdate method, specifically the so that { new: true} is the default
// Learn more: https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
mongoose.set("returnOriginal", false);

// Setup connection for MongoDB
// https://mongoosejs.com/docs/connections.html#connections
mongoose
  .connect(MONGODB_URI)
  .catch((error) =>
    console.error("Error connecting to MongoDB: ", error.message)
  );

// Listen to MongoDB events
// Learn more: https://mongoosejs.com/docs/connections.html#connection-events
mongoose.connection.on("connected", () =>
  console.log(chalk.bold(`Connected to MongoDB!`))
);

mongoose.connection.on("disconnected", () =>
  console.log(chalk.bold(`Disconnected from MongoDB!`))
);

// Listen to any errors while connected to MongoDB
// Learn more: https://mongoosejs.com/docs/connections.html#error-handling
mongoose.connection.on("error", (error) =>
  console.error(chalk.red(`MongoDB connection error: ${error}`))
);

// Export the connection
export default mongoose.connection;