import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://soumyanayakraju:soumyanayakraju@ecom.jnw0hic.mongodb.net/",
      {
        dbName: "oneSolution",
      }
    )
    .then((c) => console.log(`DB Connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export default connectDB;
