import { User } from "../models/user.js";
import ErrorHandler from "../utils/errorHandlerClass.js";
import { TryCatch } from "../utils/tryCatchWrapper.js";

// Middleware to make sure only admin is allowed
export const isAdmin = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("Unauthorized User", 401));

  const user = await User.findById(id);
  if (!user)
    return next(new ErrorHandler("The ID you entered is not exist", 401));
  if (user.role !== "admin")
    return next(new ErrorHandler("You are not an Administrator", 403));

  next();
});
/*This code snippet defines a middleware function named `isAdmin` that is used to ensure that only users with admin privileges are allowed to access certain routes in an Express application. Here's an explanation of how the middleware works:

1. Import Statements:
   - `User`: This is imported from the `"../models/user.js"` file and likely represents a model for user data, possibly defined using a library like Mongoose.
   - `ErrorHandler`: This is imported from the `"../utils/errorHandlerClass.js"` file and is used to create custom error objects with specific messages and status codes.
   - `TryCatch`: This is imported from the `"../utils/tryCatchWrapper.js"` file and is likely a wrapper function that helps with error handling and avoiding try-catch blocks in asynchronous functions.

2. Middleware Function:
   - `isAdmin`: This middleware function is an asynchronous function wrapped in `TryCatch` to handle any errors that might occur during its execution.
   - It takes three parameters: `req` (request object), `res` (response object), and `next` (callback function to pass control to the next middleware).
   - The function first extracts the `id` from the query parameters of the request using `req.query`.
   - If no `id` is provided in the request, it immediately calls `next` with an `ErrorHandler` instance that indicates the user is unauthorized (status code 401).
   - It then attempts to find a user in the database with the provided `id` using `User.findById(id)` (assuming `User` is a model with a `findById` method).
   - If no user is found with the given `id`, it calls `next` with an error indicating that the ID does not exist.
   - If the user is found but their role is not "admin", it calls `next` with an error indicating that the user is not an administrator (status code 403).
   - If the user is found and has the role of "admin", the function calls `next` to pass control to the next middleware in the chain.

3. Purpose:
   - This middleware function is designed to restrict access to routes based on the role of the user making the request.
   - It checks if the user is an admin by verifying their role in the database and only allows access to routes if the user is an admin.
   - If the user is not an admin or if the ID is not valid, it sends an appropriate error response using the `ErrorHandler` class.

Overall, this `isAdmin` middleware helps enforce authorization rules in the Express application by ensuring that only admin users can access certain routes.
 */
