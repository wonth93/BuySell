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

router.get("/myFavourites/:id", (req, res) => {
  const id = req.params.id;
  // const user_id = req.cookies.user_id;
  const query = `SELECT cars.*, cars_favourites.id AS car_fav_id FROM cars_favourites INNER JOIN users ON users.id = buyer_id INNER JOIN cars ON cars.id = car_id WHERE cars_favourites.id = ${id}`;
  db.query(query)
    .then((data) => {
      const car = data.rows;
      res.json(car[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Add favourite
router.post("/myFavourites/:id/add", (req, res) => {
  const id = req.params.id;
  const user_id = req.cookies.user_id;

  const query = `INSERT INTO cars_favourites (buyer_id, car_id) VALUES (${user_id}, ${id})`;
  db.query(query)
    // userQueries
    //   .addFavourite({ ...req.body, buyer_id: user_id })
    .then((cars) => {
      // res.send(cars);
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Remove favourites
router.post("/myFavourites/:id/delete", (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM cars_favourites WHERE id = ${id}`; //`DELETE FROM cars_favourites JOIN cars ON car_id = cars.id WHERE id = ${id}`
  db.query(query)
    .then(() => {
      res.redirect("/");
      //res.status(200);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get my messages
router.get("/myMessages", (req, res) => {
  const user_id = req.cookies.user_id;
  //console.log(user_id);

  userQueries
    .getMyMessages(user_id)
    .then((messages) => {
      // console.log(cars);
      res.send({ messages });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Login and Logout routes
router.get("/login/:id", (req, res) => {
  res.cookie("user_id", req.params.id);
  res.redirect("/");
});

router.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/");
});

module.exports = router;
