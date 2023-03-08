const express = require("express");
const router = express.Router();
const {
  allShares,
  addShare,
  updateShare,
} = require("../controllers/shareController");

router.route("/all").get(allShares);
router.route("/").post(addShare);
router.route("/:id").put(updateShare);

module.exports = router;
