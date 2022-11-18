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

// Get user
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

  userQueries
    .getMyListings(user_id)
    .then((cars) => {
      res.send({ cars });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get the list of my favourite cars
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

// Add car to my favourites
router.post("/myFavourites/:id/add", (req, res) => {
  const id = req.params.id;
  const user_id = req.cookies.user_id;

  userQueries
    .addFavourite(user_id, id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Remove cars from  my favourites
router.post("/myFavourites/:id/delete", (req, res) => {
  const id = req.params.id;

  userQueries
    .removeFavourite(id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get my messages
router.get("/myMessages", (req, res) => {
  const user_id = req.cookies.user_id;

  userQueries
    .getMyMessages(user_id)
    .then((messages) => {
      res.send({ messages });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Send message to seller
router.post("/myMessages/:receiver_id/:car_id/add", (req, res) => {
  const car_id = req.params.car_id;
  const receiver_id = req.params.receiver_id;
  const user_id = req.cookies.user_id;
  const message = req.body.text;
  console.log(req.params)

  // If message is empty message cannot be sent
  if (!message) {
    return res.status(400);
  }

  userQueries
    .sendMessage(user_id, receiver_id, car_id, message)
    .then(() => {
      console.log(req.body);
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


// User login
router.get("/login/:id", (req, res) => {
  res.cookie("user_id", req.params.id);
  res.redirect("/");
});

// User logout
router.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/");
});

module.exports = router;
