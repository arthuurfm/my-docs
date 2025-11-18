import {scryptSync, timingSafeEqual} from 'crypto';

function authenticateUser(password, user) {
  const hashTest = scryptSync(password, user.saltPassword, 64);
  const realHash = Buffer.from(user.hashPassword, 'hex');
  const authenticate = timingSafeEqual(hashTest, realHash);
  return authenticate;
}

export default authenticateUser;