const { Op } = require("sequelize");
const { signToken, signTokenEmail, verifyToken } = require("../helpers/jwt");
const { User, Donation } = require("../models/index");
const {
  sendVerificationEmail,
  sendLoginNotificationEmail,
  resendVerificationEmail,
} = require("../services/emailService");
const { comparePassword } = require("../helpers/bcrypt");
const redis = require("../config/redis");

class UserController {
  static async register(req, res, next) {
    try {
      let { name, username, email, password } = req.body;

      // Test
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

  static async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;

      if (!token) throw { naame: "NO_TOKEN_PROVIDED" };

      // Decoded token
      const decoded = verifyToken(token);

      // Cari user berdasarkan decoded.id
      const findUser = await User.findByPk(decoded.id);

      if (!findUser) throw { name: "AUTHEN_USER_NOT_FOUND" };

      // Cek apakah ini sudah verified
      if (findUser.isEmailVerified)
        throw { name: "USER_VERIFY_EMAIL_ALREADY_VERIFIED" };

      // Kalau belum, update isEmailVerified = true
      const update = await User.update(
        {
          isEmailVerified: true,
          updatedAt: new Date(),
        },
        {
          where: {
            id: decoded.id,
          },
        }
      );

      if (update[0] === 0) throw { name: "USER_FAILED_TO_VERIFY" };

      res.status(200).json({ message: "Email verified successfully." });
    } catch (error) {
      next(error);
    }
  }

  static async resendVerificationEmail(req, res, next) {
    try {
      const { email } = req.body;

      if (!email) throw { name: "RESEND_VERIFICATION_EMAIL_VALIDATION" };

      // Cari user berdasarkan email
      const findUser = await User.findOne({
        where: { email },
      });

      if (!findUser) throw { name: "AUTHEN_USER_NOT_FOUND" };

      // Buat token JWT
      const token = signTokenEmail({ id: findUser.id });

      // Link verifikasi email
      const link = `${process.env.URL}/verify-email?token=${token}`;

      const dataVerifyEmail = {
        username: findUser.username,
        email: findUser.email,
        link,
      };

      await resendVerificationEmail(dataVerifyEmail);

      res.status(200).json({
        message:
          "Verification email resent successfully. Please check your email.",
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(req, res, next) {
    try {
      const userId = req.user.id;
      const cacheKey = `user:${userId}`;

      const cachedUser = await redis.get(cacheKey);
      if (cachedUser) {
        console.log("Dari Redis");

        return res.status(200).json({ user: JSON.parse(cachedUser) });
      }

      // Cari user
      const findUser = await User.findByPk(userId, {
        attributes: {
          exclude: ["password"],
        },
      });

      if (!findUser) throw { name: "AUTHEN_USER_NOT_FOUND" };

      // Simpan ke Redis dengan expired time 1 jam
      await redis.set(cacheKey, JSON.stringify(findUser), "EX", 3600);

      console.log("Dari Database");

      res.status(200).json({
        user: findUser,
      });
    } catch (error) {
      console.log(error, "Er");

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
// AUTHEN_USER_NOT_FOUND
// USER_VERIFY_EMAIL_ALREADY_VERIFIED
// USER_FAILED_TO_VERIFY
// RESEND_VERIFICATION_EMAIL_VALIDATION
