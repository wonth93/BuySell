/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const db = require("../db/connection");

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

router.get("/my-listings", (req, res) => {
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

// router.get("/my-listings.html", (req, res) => {
//   res.redirect("/my-listings");
// });

module.exports = router;
