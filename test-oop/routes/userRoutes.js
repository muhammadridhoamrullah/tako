const UserController = require("../controllers/UserController");

const router = require("express").Router();

router.post("/register", UserController.register);
router.get("/users", UserController.getAllUsers);

module.exports = router;
