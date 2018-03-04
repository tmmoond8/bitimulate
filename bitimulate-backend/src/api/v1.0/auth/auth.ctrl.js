const Joi = require('joi');
const User = require('db/models/User');
const token = require('lib/token');
const { optionsPerCurrency } = require('lib/variables');
const { getProfile } = require('lib/social');

exports.checkEmail = async (ctx) => {
  const { email } = ctx.params;

  if (!email) {
    ctx.status = 400;
    return;
  }

  try {
    const account = await User.findByEmail(email);
    ctx.body = {
      exists: !!account
    };
    console.log(account);
  } catch(e) {
    ctx.throw(e, 500);
  }
};

exports.checkDisplayName = async (ctx) => {
  const { displayName } = ctx.params;
  
  if (!displayName) {
    ctx.status = 400;
    return;
  }

  try {
    const account = await User.findByDisplayName(displayName);
    ctx.body = {
      exists: !! account
    };
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.localRegister = async (ctx) => {
  const body = ctx.request.body;
  const schema = Joi.object({
    displayName: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,12}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30),
    initialMoney: Joi.object({
      currency: Joi.string().valid(['BTC', 'USD', 'KRW']).required(),
      index: Joi.number().min(0).max(2).required()
    }).required()
  });
  
  const result = Joi.validate(body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { displayName, email, password, initialMoney }  = body;
  try {
    // check email and displayName existancy
    const exists = await User.findExistancy({displayName, email});
    if (exists) {
      ctx.status = 409;
      const key = exists.email === email ? 'email' : 'displayName';
      ctx.body = {
        key
      };
      return;
    }
    const initial = {
      currency: initialMoney.currency,
      value: optionsPerCurrency[initialMoney.currency].initialValue * Math.pow(10, initialMoney.index)
    }
    const user = await User.localRegister({
      displayName, email, password, initial
    });
    ctx.body = user;

    const accessToken = await user.generateToken();
    
    token.generateToken({
      user: {
        _id: user._id,
        displayName: user.displayName
      }
    }, 'user');

    // set access token
    ctx.cookies.set('access_token', accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
  } catch (e) {
    ctx.throw(e, 500);
  }
};


exports.localLogin = async (ctx) => {
  const { body } = ctx.request;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30)
  });
  const result = Joi.validate(body, schema);
  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { email, password } = body;

  try {
    // find user
    const user = await User.findByEmail(email);
    if (!user) {
      // user does not exist
      ctx.status = 403;
      return;
    }

    const validated = user.validatePassword(password);
    if (!validated) {
      // wrong password
      ctx.status = 403;
      return;
    }
    const accessToken = await user.generateToken();
    ctx.cookies.set('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 4
    });

    ctx.status = 200;
    const { displayName, _id, metaInfo } = user;
    ctx.body = {
      displayName,
      _id,
    }
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.socialLogin = async (ctx) => {
  const schema = Joi.object().keys({
    accessToken: Joi.string().required()
  });
  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { provider } = ctx.params;
  const { accessToken } = ctx.request.body;

  let profile = null;
  try {
    profile = await getProfile(provider, accessToken);
    // console.log('profile', profile);
    ctx.body = {
      profile
    };
  } catch(e) {
    ctx.status = 403;
    console.log(e);
    return;
  }
};

exports.logout = (ctx) => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
};

exports.check = (ctx) => {
  const { user } = ctx.request;
  if (!user) {
    ctx.status = 403;
    return;
  }

  ctx.body = {
    user
  }
}