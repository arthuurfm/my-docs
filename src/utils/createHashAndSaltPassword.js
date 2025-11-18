import { randomBytes, scryptSync } from 'crypto';

function createHashAndSaltPassword(password) {
  const saltPassword = randomBytes(16).toString('hex');
  const hashPassword = scryptSync(password, saltPassword, 64).toString('hex');
  return { saltPassword, hashPassword };
}

export default createHashAndSaltPassword;