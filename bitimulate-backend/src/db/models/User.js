const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const { Schema } = mongoose;
const { PASSWORD_HASH_KEY: secret } = process.env;
const crypto = require('crypto');
const token = require('lib/token');

function hash(password) {
  return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

const Wallet = new Schema({
  BTC: Schema.Types.Double,
  USD: Schema.Types.Double,
  KRW: Schema.Types.Double,
}, { _id: false });

const User = new Schema({
  displayName: String,
  email: String,
  password: String, // optional
  social: {
    facebook: {
      id: String,
      accessToken: String
    },
    google: {
      id: String,
      accessToken: String
    }
  },
  createAt: {
    type: Date,
    default: Date.now
  },

  metaInfo: {
    activated: { type: Boolean, default: false },
    initial: {
      currency: String,
      value: String
    },
  },

  wallet: {
    type: Wallet,
    default: {
      BTC: 0,
      KRW: 0,
      USD: 0
    }
  }
});

User.statics.findByEmail = function(email) {
  return this.findOne({email}).exec();
};

User.statics.findByDisplayName = function(displayName) {
  return this.findOne({displayName}).exec();
}

User.statics.findExistancy = function({email, displayName}) {
  return this.findOne({
    $or: [
      {email},
      {displayName}
    ]
  }).exec();
}

User.statics.localRegister = function({ displayName, email, password, initial }) {
  const user = new this({
    displayName,
    email,
    password: hash(password),
    metaInfo: {
      initial
    }
  });

  // sets initial money
  const { currency, value } = initial;
  user.wallet[currency] = value;
  
  return user.save();
}

User.methods.validatePassword = function(password) {
  const hashed = hash(password);
  return this.password === hashed;
}

User.methods.generateToken = function() {
  const { _id, displayName } = this;
  return token.generateToken({
    user: {
      _id,
      displayName
    }
  }, 'user');
};


module.exports = mongoose.model('User', User);