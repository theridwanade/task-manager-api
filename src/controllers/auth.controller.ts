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
    res.cookie("token", result.data!.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.cookie("refreshToken", result.data!.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(result.code).set("Authorization", `Bearer ${result.data!.token}`).json({
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


export const authLogoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout successful",
      code: 200,
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