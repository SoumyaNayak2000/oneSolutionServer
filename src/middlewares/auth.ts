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
