const User = require("../models/User");

class UserService {
  static registerUser(name, email, password) {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    // cek email
    const checkEmail = User.findByEmail(email);

    if (checkEmail) {
      throw new Error("Email already registered");
    }

    // create user
    const newUser = new User(name, email, password);

    // simpan user
    User.saveUser(newUser);
    return newUser;
  }

  static getAllUsers() {
    return User.getAllUsers();
  }
}

module.exports = UserService;
