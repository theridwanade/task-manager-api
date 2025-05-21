import { Request, Response } from "express";
import { authLoginService, authSignupService } from "../services/auth.service";
import { generateToken, verifyToken } from "../util/jwttoken";
import User from "../model/users.model";

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
    res
      .status(result.code)
      .set("Authorization", `Bearer ${result.data!.token}`)
      .json({
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
};

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

export const authRefreshTokenController = async (
  req: Request,
  res: Response
) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(401).json({
        message: "Refresh token not found",
        code: 401,
        success: false,
      });
      return;
    }
    const decodeRefreshToken = await verifyToken(refreshToken);
    if (!decodeRefreshToken) {
      res.status(401).json({
        message: "Invalid refresh token",
        code: 401,
        success: false,
      });
      return;
    }
    const user = await User.findById(decodeRefreshToken.userId);
    if (!user) {
      res.status(401).json({
        message: "User not found",
        code: 401,
        success: false,
      });
      return;
    }
    if (!user.isVerified) {
      res.status(401).json({
        message: "User not verified",
        code: 401,
        success: false,
      });
      return;
    }
    const token = await generateToken(
      {
        userId: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      60 * 60
    ); // 1 hour
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200) .set("Authorization", `Bearer ${token}`).json({
      message: "Token refreshed successfully",
      code: 200,
      success: true,
      data: {
        token,
      },
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      code: 500,
      success: false,
    });
    return;
  }
};
