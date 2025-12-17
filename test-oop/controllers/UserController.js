const UserService = require("../services/UserService");

class UserController {
  static register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const newUser = UserService.registerUser(name, email, password);
      res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static getAllUsers(req, res, next) {
    try {
      const users = UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;
