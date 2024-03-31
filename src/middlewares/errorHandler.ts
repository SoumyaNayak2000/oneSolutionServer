import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandlerClass.js";

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if (err.name === "CastError") err.message = "Invalid ID";

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
/*This code snippet defines an error handling middleware function in an Express application. Here's an explanation of the key components:

1. Import Statements:
   - `Request`, `Response`, `NextFunction`: These are imported from the `express` module to provide type definitions for the request, response, and next function parameters in the middleware function.
   - `ErrorHandler`: This is imported from the `../utils/errorHandlerClass.js` file. It likely represents a custom error class that extends the `Error` class and provides additional properties like `statusCode` and `message`.

2. Error Middleware Function:
   - `errorMiddleware`: This function is the error handling middleware that takes four parameters:
     - `err`: An instance of the `ErrorHandler` class representing the error that occurred.
     - `req`: The Express `Request` object.
     - `res`: The Express `Response` object.
     - `next`: The Express `NextFunction` to pass control to the next middleware function.

   - The middleware function first sets default values for the error message and status code if they are not already defined in the `err` object.
   - It then checks if the error name is "CastError" (a common error in Mongoose when casting object IDs). If so, it updates the error message to "Invalid ID".
   - Finally, the function sends a JSON response with the status code and error message, indicating that the request was not successful (`success: false`).

3. Error Handling:
   - The middleware function intercepts errors thrown by previous middleware functions or route handlers.
   - It standardizes the error response format and sends an appropriate error message and status code back to the client.

This error middleware function helps in centralizing error handling logic in the Express application, making it easier to manage and respond to errors consistently across different parts of the application.
 */