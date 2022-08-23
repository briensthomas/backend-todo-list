const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ firstName, lastName, email, password }) {
    // if (await User.getByEmail(email)) throw new Error('Email is already in use');
    
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      firstName, lastName, email, passwordHash
    });

    return user;
  }
};
