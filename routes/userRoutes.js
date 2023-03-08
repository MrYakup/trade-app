const express = require("express");
const router = express.Router();
const {
  allUsers,
  createUser,
  bulkCreateUsers,
  findUserById,
  updateUserPassword,
  deleteUser
} = require("../controllers/userController");

router.route("/all").get(allUsers);
router.route("/:id").get(findUserById);
router.route("/").post(createUser);
router.route("/multiple").post(bulkCreateUsers);
router.route("/:id").put(updateUserPassword);
router.route("/:id").delete(deleteUser);

module.exports = router;
