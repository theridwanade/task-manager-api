import { Request, Response } from "express";
import { authLoginService, authSignupService } from "../services/auth.service";

export const authSignupController = async (req: Request, res: Response) => {
  try {
    const result = await authSignupService(req.body);
    res.status(result.code).json({
      message: result.message,
      code: result.code,
      success: result.success,
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

export const authLoginController = async (req: Request, res: Response) => {
  try {
    const result = await authLoginService(req.body);
    res.status(result.code).json({
      message: result.message,
      code: result.code,
      success: result.success,
      data: result.data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      code: 500,
      success: false,
    });
    return;
  }
}