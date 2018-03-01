const { generateToken, decodeToken } =  require('../token');

module.exports = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) {
    // if thre is no token, skip
    ctx.request.user = null;
    return next();
  }
  try {
    const decoded = await decodeToken(token);
    const { user } = decoded;
    ctx.request.user = user;
    // re-issue token when its age is over 4 days
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24 * 3) {
      const freshToken = await generateToken({ user }, 'user');
      ctx.cookies.set('access_token', freshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7
      });
    }
    
  } catch (e) {
    ctx.request.user = null;
  }

  return next();
}