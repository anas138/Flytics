import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

export const generateApiKey = async () => {
  const uniqueKeyString = v4();
  const key = await bcrypt.hash(uniqueKeyString, 10);
  const keyHash = await bcrypt.hash(key, 10);
  return [key, keyHash];
};

export const generateApiSecret = async () => {
  const uniqueSecString = v4();
  const secret = await bcrypt.hash(uniqueSecString, 10);
  const secretHash = await bcrypt.hash(secret, 10);
  return [secret, secretHash];
};

export const encodeString = async (value: string) => {
  const hash = await bcrypt.hash(value, 10);
  return hash;
};

export const compareKey = async (key, dbHash) => {
  return await bcrypt.compare(key, dbHash);
};
