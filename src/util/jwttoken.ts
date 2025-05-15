import jwt from 'jsonwebtoken';

export const generateToken = async (data: any) => {
  try {
    return jwt.sign(data, process.env.JWT_SECRET as string, {
      expiresIn: '1h'
    })
  } catch (error) {
    throw error
  }
}