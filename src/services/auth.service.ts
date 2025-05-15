import User from "../model/users.model";
import { hashData } from "../util/hashData";

interface signupDataType {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}
export const authSignupService = async (signupData: signupDataType) => {
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