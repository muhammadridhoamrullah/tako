const { Op } = require("sequelize");
const { signToken, signTokenEmail } = require("../helpers/jwt");
const { User, Donation } = require("../models/index");
const {
  sendVerificationEmail,
  sendLoginNotificationEmail,
} = require("../services/emailService");
const { comparePassword } = require("../../backend-sbubu/helpers/bcrypt");

class UserController {
  static async register(req, res, next) {
    try {
      let { name, username, email, password } = req.body;

      // Validasi input, semua field harus diisi
      if (!name || !username || !email || !password) {
        throw { name: "USER_REGISTER_VALIDATION" };
      }

      // Sanitize name, username, email, password
      name = name.trim();
      username = username.toLowerCase().trim();
      email = email.toLowerCase().trim();
      password = password.trim();

      //  Cek apakah username dan email sudah ada
      const checkUsernameEmail = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (checkUsernameEmail) {
        if (checkUsernameEmail.username === username) {
          throw { name: "USER_REGIS_USERNAME_ALREADY_EXISTS" };
        }
        throw { name: "USER_REGIS_EMAIL_ALREADY_EXISTS" };
      }

      // Buat user baru
      const newUser = await User.create({
        name,
        username: username.toLowerCase(),
        email,
        password,
      });

      // Buat token JWT untuk verifikasi email
      const token = signTokenEmail({ id: newUser.id });

      // Link verifikasi email
      const link = `${process.env.URL}/verify-email?token=${token}`;

      const dataVerifyEmail = {
        username,
        email,
        link,
      };

      await sendVerificationEmail(dataVerifyEmail);

      res.status(201).json({
        message: `User ${newUser.username} registered successfully. Please check your email to verify your account.`,
      });
    } catch (error) {
      console.log(error, "err");

      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { identifier, password } = req.body;

      if (!identifier || !password) throw { name: "USER_LOGIN_VALIDATION" };

      // Sanitize
      identifier = identifier.toLowerCase().trim();
      password = password.trim();

      // Check user apakah ada?
      const checkUser = await User.findOne({
        where: {
          [Op.or]: [{ email: identifier }, { username: identifier }],
        },
      });

      if (!checkUser) throw { name: "USER_LOGIN_EMAIL_PASS_INVALID" };

      // Check password
      const checkingPassword = await comparePassword(
        password,
        checkUser.password
      );

      if (!checkingPassword) throw { name: "USER_LOGIN_EMAIL_PASS_INVALID" };

      // Check email verified or not?
      if (!checkUser.isEmailVerified)
        throw { name: "USER_LOGIN_EMAIL_NOT_VERIFIED" };

      // Buat accessToken
      const accessToken = signToken({
        id: checkUser.id,
      });
      console.log(accessToken, "Acc");

      // Update lastLoginAt
      const updateLastLogin = await User.update(
        { lastLoginAt: new Date() },
        { where: { id: checkUser.id } }
      );

      // Notif Email Login
      const dataNotif = {
        name: checkUser.name,
        email: checkUser.email,
      };

      await sendLoginNotificationEmail(dataNotif);

      res.status(200).json({
        accessToken,
      });
    } catch (error) {
      console.log(error, "er");

      next(error);
    }
  }
}

module.exports = UserController;

// USER_REGISTER_VALIDATION
// USER_REGIS_USERNAME_ALREADY_EXISTS
// USER_REGIS_EMAIL_ALREADY_EXISTS

// USER_LOGIN_VALIDATION
// USER_LOGIN_EMAIL_PASS_INVALID
// USER_LOGIN_EMAIL_NOT_VERIFIED
