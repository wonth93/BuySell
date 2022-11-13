/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

// router.get("/login/:id", (req, res) => {
//   res.cookie("user_id", req.params.id);
//   res.redirect("/");
// });

// router.post("/logout", (req, res) => {
//   res.clearCookie("user_id");
//   res.redirect("/");
// });

module.exports = router;
