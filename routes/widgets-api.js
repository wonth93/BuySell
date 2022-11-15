/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const carQueries = require("../db/queries/database");

router.get("/", (req, res) => {
  // const query = `SELECT * FROM cars`;
  carQueries
    .getAllCars()
    .then((cars) => {
      // const cars = data.rows;
      // console.log(cars);
      res.send({ cars });
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
      // console.log(car[0]);
      // res.json({ car });
      res.json(car[0]);
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

// Delete listing
router.post("/:id/delete", (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM cars WHERE id = ${id}`;
  db.query(query)
    .then(() => {
      res.redirect("/");
      //res.status(200).send();
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
