const express = require("express");
const router = express.Router();

router.post("/login", function (req, res) {
  const { email, password } = req.body;
});

module.exports = router;
