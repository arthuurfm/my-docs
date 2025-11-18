import jwt from 'jsonwebtoken';

function generateJwt(payload) {
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
  
  return jwtToken;
}

export default generateJwt;