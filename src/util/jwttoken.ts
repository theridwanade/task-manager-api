import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  userId?: string;
  email?: string;
  role?: string;
}

export const generateToken = async (data: any, time: number) => {
  try {
    return jwt.sign(data, process.env.JWT_SECRET as string, {
      expiresIn: time,
    })
  } catch (error) {
    throw error
  }
}

export const verifyToken = async (token: string): Promise<TokenPayload> => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload
  } catch (error) {
    throw error
  }
}