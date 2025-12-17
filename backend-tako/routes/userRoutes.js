const UserController = require("../controllers/userController");
const { authentication } = require("../middlewares/authentication");

const userRouter = require("express").Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.patch("/verify-email", UserController.verifyEmail);
userRouter.post(
  "/resend-verification-email",
  UserController.resendVerificationEmail
);

userRouter.get("/me", authentication, UserController.me);

module.exports = userRouter;
