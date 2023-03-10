const userModel = require("../models/userModel");
const userData = require("../data/userData");

const allUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    if (!users) return res.status(400).json({ success: false, message: "users get request error" });

    return res.status(200).json({
      success: true,
      message: users.length > 0 ? `${users.length == 1 ? "1 user found" : users.length + " users found"}` : "no users found",
      users,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ success: false, message: "Email or password is missing" });

    const newUser = await userModel.create({ email, password });

    return res.status(200).json({ success: true, message: "User created successfully", newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const bulkCreateUsers = async (req, res) => {
  try {
    const { users } = req.body;

    if (!users || users.length < 1) return res.status(400).json({ success: false, message: "Users are missing" });

    const newUsers = await userModel.bulkCreate(users);
    
    return res.status(200).json({ success: true, message: "successfully created", newUsers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ success: false, message: "Invalid user" });

    const user = await userModel.findByPk(id);
    return res.status(200).json({ success: true, message: "successfully get user", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!id || !password) return res.status(400).json({ success: false, message: "Missing id or password" });

    const updatedUser = await userModel.update(
      { password: password },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "successfully update user",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "Missing id" });

    const deletedUser = await userModel.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "successfully delete user",
      deletedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  allUsers,
  createUser,
  bulkCreateUsers,
  findUserById,
  updateUserPassword,
  deleteUser,
};
