import jwt from "jsonwebtoken";

// signin token
export const signJwtToken = (payload, options = {}) => {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, options);
  return token;
};

// verifying jwt token
export const verifyJwtToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
};
