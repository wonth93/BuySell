/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const userQueries = require("../db/queries/users");

router.get("/", (req, res) => {
  const query = `SELECT * FROM cars`;
  console.log(query);
  db.query(query)
    .then((data) => {
      const cars = data.rows;
      //console.log(cars);
      res.json({ cars });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM cars WHERE id = ${id}`;
  // console.log(query);
  db.query(query)
    .then((data) => {
      const car = data.rows;
      console.log(car[0]);
      // res.json({ car });
      res.json(car[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// router.get("/myListings/:id", (req, res) => {
//   const { id } = req.params;
//   const { user_id } = req.cookies;
//   if (id === user_id) {
//     const query = `SELECT * FROM cars JOIN users ON seller_id = users.id WHERE seller_id = ${user_id}`;
//     console.log(user_id);
//     db.query(query)
//       .then((data) => {
//         const cars = data.rows;
//         console.log(cars);
//         //res.render("index", cars[0]);
//         res.json({ cars });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   }
// });

// router.get("/my-listings.html", (req, res) => {
//   res.redirect("/my-listings");
// });

module.exports = router;
