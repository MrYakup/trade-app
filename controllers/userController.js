const userModel = require("../models/userModel");
const userData = require("../data/userData");

const allUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    return res.status(200).json({ success: true, message: "successfully get all users", users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const newUser = await userModel.create({ email, password });

    return res.status(200).json({ success: true, message: "successfully created", newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const bulkCreateUsers = async (req, res) => {
  try {
    const { users } = req.body;

    if (!users || users.length === 0) return res.status(400).json({ success: false, message: "Invalid users" });

    const newUsers = await userModel.bulkCreate(users);
    console.log(newUsers)
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

    if (!id || !password) return res.status(400).json({ success: false, message: "Invalid id or password" });

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
    if (!id) return res.status(400).json({ success: false, message: "Invalid id" });

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
