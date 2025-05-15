import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../model/users.model";

export const authSignupController = async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
        code: 400,
        success: false,
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;
    if(firstname && lastname) {
      newUser = new User({
        email,
        password: hashedPassword,
        firstname,
        lastname,
      });
    } else {
      newUser = new User({
        email,
        password: hashedPassword,
      });
    }
    const user = await newUser.save();
    if (!user) {
      res.status(500).json({
        message: "User not created",
        code: 500,
        success: false,
      });
      return;
    }
    res.status(201).json({
      message: "User created successfully",
      code: 201,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      code: 500,
      success: false,
    });
    return;
  }
};
