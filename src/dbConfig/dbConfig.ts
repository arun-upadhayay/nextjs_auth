import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = await mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (err) => {
      console.log(`MongoDb Connection Error data base not connect issue  ${err}`);
      process.exit();
     });
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}
