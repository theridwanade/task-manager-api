import { Request, Response } from "express";

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
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      code: 500,
      success: false,
    });
    return;
  }
};
