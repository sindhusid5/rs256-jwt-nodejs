import fs from 'fs';
import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH!, 'utf8') as jwt.Secret;
const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH!, 'utf8') as jwt.Secret;

export function generateToken(payload: object): string {
  const options: SignOptions = {
    algorithm: 'RS256',
    expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as SignOptions['expiresIn'], // ✅ cast
  };

  return jwt.sign(payload, privateKey, options);
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}
