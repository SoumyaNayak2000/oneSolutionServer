import { NextFunction, Request, Response } from "express";
import { ControllerType } from "../types/types.js";

export const TryCatch =
  (func: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };



/*   The `TryCatch` function is a higher-order function that acts as a middleware in an Express application. It takes a controller function `func` of type `ControllerType` as input and returns a new middleware function that wraps around the original controller function.

When the new middleware function is executed in a route handler, it ensures that any errors thrown by the `func` are caught and passed to the Express `next` function for error handling middleware to process. This helps to prevent the application from crashing due to uncaught exceptions.

In summary, the `TryCatch` function enhances error handling within Express route handlers by wrapping the controller function in a promise that catches any errors and forwards them to the global error handling middleware.*/
