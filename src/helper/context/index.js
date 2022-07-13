const jwt = require('jsonwebtoken');
module.exports.verifyUser = async (req) => {
  try {
    req.email = null;
    const { authorization } = req.headers;
    const [_, token] = authorization.split(' ');
    const { user } = await jwt.verify(token, process.env.jwtSecret);
    return (req.user = user);
  } catch (err) {
    console.log('Authorization verification failed', err.message);
    throw err;
  }
};
