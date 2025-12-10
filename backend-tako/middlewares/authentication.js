const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function authentication(req, res, next) {
  try {
    // Di destruc terlebih daulu, untuk mengambil authorization di headers
    const { authorization } = req.headers;

    if (!authorization) throw { name: "NO_TOKEN_PROVIDED" };

    // Cek format token
    if (!authorization.startsWith("Bearer"))
      throw { name: "INVALID_TOKEN_FORMAT" };

    // Ambil tokennya
    let token = authorization.split(" ")[1];

    // Verifikasi token
    let payload = verifyToken(token);

    // Find User
    const findUser = await User.findByPk(payload.id);

    if (!findUser) throw { name: "AUTHEN_USER_NOT_FOUND" };

    // Simpan data user ke req

    req.user = {
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
      name: findUser.name,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
};

// AUTHEN_USER_NOT_FOUND
// NO_TOKEN_PROVIDED
// INVALID_TOKEN_FORMAT
