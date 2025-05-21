import User from "../model/users.model";
import { hashData } from "../util/hashData";
import bcrypt from "bcrypt";
import { generateToken } from "../util/jwttoken";

interface AuthDataType {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}
export const authSignupService = async (signupData: AuthDataType) => {
  try {
    const { email, password, firstname, lastname } = signupData;
    if (!email || !password) {
      return {
        message: "Email and password are required",
        code: 400,
        success: false,
      };
    }

    const hashedPassword = await hashData(password);
    let newUser;
    if (firstname && lastname) {
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
      return {
        message: "User not created",
        code: 500,
        success: false,
      };
    }
    return {
      message: "User created successfully",
      code: 201,
      success: true,
    };
  } catch (error: any) {
    return {
      message: error.message,
      code: 500,
      success: false,
    };
  }
};

export const authLoginService = async (loginData: AuthDataType) => {
  try {
    const { email, password } = loginData;
    if (!email || !password) {
      return {
        message: "Email and password are required",
        code: 400,
        success: false,
      };
    }

    const user = await User.findOne({ email });
    if (!user) {
      return {
        message: "User not found",
        code: 404,
        success: false,
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        message: "Invalid password",
        code: 401,
        success: false,
      };
    }
    const token = await generateToken({
      userId: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    }, 60 * 60); // 1 hour
     const refreshToken = await generateToken({
      userId: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    }, 60 * 60 * 24 * 30); // 30 days
    return {
      message: "Login successful",
      code: 200,
      success: true,
      data: {
        token: token,
        refreshToken: refreshToken,
      }
    };
  } catch (error: any) {
    return {
      message: error.message,
      code: 500,
      success: false,
    };
  }
};
