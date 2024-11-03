const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./hotel"));
router.use("/auth", require("./auth"));
router.use("/users", require("./user"));

module.exports = router;
