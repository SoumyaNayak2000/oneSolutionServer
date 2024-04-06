import mongoose from "mongoose";
import validator from "validator";

//creating type annotation for user

interface MeUser extends Document {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female" | "others";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  //   Virtual Attribute
  age: number;
}

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter your ID"],
    },
    name: {
      type: String,
      required: [true, "Please enter your Name"],
    },
    email: {
      type: String,
      unique: [true, "Email already exist"],
      required: [true, "Please enter your Email"],
      validate: validator.default.isEmail, //this package will validate the email is correct or not
    },
    photo: {
      type: String,
      required: [true, "Please add your Photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: [true, "Please enter your gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter your DOB"],
    },
  },
  {
    timestamps: true,
  }
);

// Adding virtual attribute
schema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
});

export const User = mongoose.model<MeUser>("User", schema);

/*
This code snippet is a TypeScript script that defines a user schema using Mongoose, a MongoDB object modeling tool designed to work in an asynchronous environment. Here's a breakdown of the code:

1: Import Statements: The script imports the necessary modules, mongoose and validator, for working with MongoDB and validating data.

2: Interface Definition: The MeUser interface is defined to describe the structure of a user document. It includes fields like _id, name, email, photo, role, gender, dob, createdAt, updatedAt, and a virtual attribute age.

3: Schema Definition: A Mongoose schema is created using the mongoose.Schema constructor. It defines the structure of the user document with various fields such as _id, name, email, photo, role, gender, and dob. Each field has specific data types, requirements, and validations.

4: Validation: The email field is validated using the validator.default.isEmail method to ensure that the email format is correct.

5: Virtual Attribute: A virtual attribute age is added to the schema using the schema.virtual method. This attribute calculates the age of the user based on the dob (date of birth) field.

6: Model Creation: Finally, a Mongoose model named User is created using mongoose.model with the defined schema and interface. This model can be used to interact with the MongoDB database and perform CRUD operations on user documents.

Overall, this script sets up a user schema with specific field requirements, data types, and validations using Mongoose, and includes a virtual attribute for calculating the user's age based on their date of birth.
 */
