/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/database");
const db = require("../db/connection");

router.get("/", (req, res) => {
  userQueries
    .getUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get my listings
router.get("/myListings", (req, res) => {
  const user_id = req.cookies.user_id;
  //console.log(user_id);

  userQueries
    .getMyListings(user_id)
    .then((cars) => {
      // console.log(cars);
      res.send({ cars });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get my favourites
router.get("/myFavourites", (req, res) => {
  const user_id = req.cookies.user_id;

  userQueries
    .getMyFavourites(user_id)
    .then((cars) => {
      res.send({ cars });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// // Create listing
// router.post("/createListing", (req, res) => {
//   const user_id = req.cookies.user_id;
//   carQueries
//     .createNewListing({ ...req.body, seller_id: user_id })
//     .then((cars) => {
//       res.send({ cars });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });


router.get("/login/:id", (req, res) => {
  res.cookie("user_id", req.params.id);
  res.redirect("/");
});

router.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/");
});

module.exports = router;
