const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
//   console.log('req.url', req.url);
//   console.log('req.method', req.method);
  try {
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];
    // console.log('cookie from middleware', cookie);
    if (!cookie) throw new Error('You must be signed in to continue');
    // console.log('!cookie', !cookie);
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    console.log('user from Authenticated', user);
    req.user = user;
    next();
  } catch(err) {
    err.status = 401;
    next(err);
  }
};
