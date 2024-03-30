import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";

export const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("user controller");

    const { _id, name, email, photo, gender, dob } = req.body;
    console.log(_id, name, email, photo, gender, dob);

    const user = await User.create({
      _id,
      name,
      email,
      photo,
      gender,
      dob: new Date(dob),
    });
    console.log(user);

    return res.status(200).json({
      success: true,
      message: `welcome ${user.name}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `go to hell`,
    });
  }
};
