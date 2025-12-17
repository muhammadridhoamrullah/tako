const crypto = require("crypto");
class User {
  static users = [];
  static currentId = 0;

  constructor(name, email, password) {
    this.id = ++User.currentId;
    this.name = name;
    this.email = email;
    this.passwordHash = this.#hashPassword(password);
  }

  #hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  checkPassword(password) {
    return this.#hashPassword(password) === this.passwordHash;
  }

  static findByEmail(email) {
    return this.users.find((el) => el.email === email);
  }

  static saveUser(user) {
    this.users.push(user);
    return user;
  }

  static getAllUsers() {
    return this.users;
  }
}

module.exports = User;
