import bcrypt from 'bcrypt';

export const hashData = async (data: string): Promise<string> => {
  try {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
  } catch (error) {
    throw new Error('Error hashing data');
  }
}