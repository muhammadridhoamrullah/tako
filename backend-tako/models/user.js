"use strict";
const { Model } = require("sequelize");

const generateOverlayKey = require("../helpers/generateOverlayKey");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Donation, {
        foreignKey: "UserId",
        as: "ReceivedDonations",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
          len: {
            args: [3, 50],
            msg: "Name must be between 3 and 50 characters",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Username is already exists",
        },
        validate: {
          notNull: {
            msg: "Username is required",
          },
          notEmpty: {
            msg: "Username is required",
          },
          len: {
            args: [3, 20],
            msg: "Username must be between 3 and 20 characters",
          },
          isAlphanumeric: {
            msg: "Username can only contain letters and numbers",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email already registered",
        },
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [6, 100],
            msg: "Password must be at least 6 characters",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
        validate: {
          notEmpty: {
            msg: "Role is required",
          },
          notNull: {
            msg: "Role is required",
          },
        },
      },
      avatarUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "/assets/image/defaultAvatar.jpg",
      },
      overlayKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Overlay Key must be unique",
        },
        validate: {
          notNull: {
            msg: "Overlay Key is required",
          },
          notEmpty: {
            msg: "Overlay Key is required",
          },
        },
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      bannerUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "/assets/image/defaultBanner.png",
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nomorTelepon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zonaWaktu: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Asia/Jakarta",
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      paranoid: true,
    }
  );
  User.beforeValidate((user) => {
    user.overlayKey = generateOverlayKey();
  });
  User.beforeCreate(async (user) => {
    user.password = await hashPassword(user.password);
  });
  return User;
};
