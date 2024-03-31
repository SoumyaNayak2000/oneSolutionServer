import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../utils/tryCatchWrapper.js";
import ErrorHandler from "../utils/errorHandlerClass.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { _id, name, email, photo, gender, dob } = req.body;

    let user = await User.findById(_id);

    if (user)
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.name}`,
      });

    if (!_id || !name || !email || !photo || !gender || !dob)
      return next(new ErrorHandler("Please add all fields", 400));

    user = await User.create({
      _id,
      name,
      email,
      photo,
      gender,
      dob: new Date(dob),
    });

    return res.status(201).json({
      success: true,
      message: `welcome ${user.name}`,
    });
  }
);

export const getAllUsers = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({});

    return res.status(200).json({
      success: true,
      users,
    });
  }
);

export const getUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  return res.status(200).json({
    success: true,
    user,
  });
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

/*This code snippet contains several middleware functions that handle different operations related to user management in an Express application. Here's an explanation of each middleware function:

1. `newUser` Middleware:
   - This middleware function is responsible for creating a new user.
   - It extracts the necessary user data (such as `_id`, `name`, `email`, `photo`, `gender`, and `dob`) from the request body.
   - It first attempts to find a user in the database by `_id`. If a user with that `_id` already exists, it sends a success response with a welcome message.
   - If any of the required fields are missing in the request body, it sends an error response using the `ErrorHandler` class with a status code of 400 (Bad Request).
   - If all required fields are present, it creates a new user in the database using `User.create()` and sends a success response with a welcome message.

2. `getAllUsers` Middleware:
   - This middleware function retrieves all users from the database and sends them back as a JSON response with a status code of 200 (OK).

3. `getUser` Middleware:
   - This middleware function retrieves a user by their ID from the database.
   - If the user with the specified ID does not exist, it sends an error response with a status code of 400 (Bad Request) using the `ErrorHandler` class.
   - If the user is found, it sends a success response with the user data.

4. `deleteUser` Middleware:
   - This middleware function deletes a user based on their ID.
   - It first attempts to find the user by ID. If the user does not exist, it sends an error response with a status code of 400 (Bad Request) using the `ErrorHandler` class.
   - If the user is found, it deletes the user from the database using `user.deleteOne()` and sends a success response with a message indicating that the user was deleted successfully.

Overall, these middleware functions handle user creation, retrieval, deletion, and listing operations in the Express application, ensuring proper error handling and response formatting using the `TryCatch` wrapper and the `ErrorHandler` class.
 */
