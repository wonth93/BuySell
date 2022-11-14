/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
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

router.get("/myListings", (req, res) => {
  // const user_id = req.cookies[user_id];

  userQueries
    .getMyListings(1/* should be user_id*/)
    .then((cars) => {
      // console.log(cars);
      res.send({ cars });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/myFavourites", (req, res) => {
  // const user_id = req.cookies[user_id];

  userQueries
  .getMyFavourites(1/* should be user_id*/)
  .then((cars) => {
      res.send({ cars });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/createListing", (req, res) => {
  // const user_id = req.cookies[user_id];
  userQueries
    .createNewListing({...req.body, seller_id: user_id})
    .then((cars) => {
      res.send({ cars });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });

});

// router.get("/myListings", (req, res) => {
//   // const { user_id } = req.cookies;
//   const query = `SELECT * FROM cars JOIN users ON seller_id = users.id WHERE seller_id = 1`;
//   // console.log(query);
//   db.query(query)
//     .then((data) => {
//       const cars = data.rows;
//       res.json({ cars });
//       // res.json(car);
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
