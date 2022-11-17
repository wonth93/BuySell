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

router.get("/price", (req, res) => {
  // const query = `SELECT * FROM cars`;
  //const price = req.body.text;
  //console.log(req.body.text);
  const filterOptions = req.query;
  carQueries
    .getCarsByPrice(filterOptions)
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

// Create listing
router.post("/add", (req, res) => {
  const user_id = req.cookies.user_id;

  carQueries
    .createNewListing({ ...req.body, seller_id: user_id })
    .then((cars) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/*`
INSERT INTO cars (seller_id, title, manufacturer, condition, description, thumbnail_photo_url, cover_photo_url, price, mileage, year, date_posted, active)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
RETURNING *;
`,
  [
    cars.seller_id,
    cars.title,
    cars.manufacturer,
    cars.condition,
    cars.description,
    cars.thumbnail_photo_url,
    cars.cover_photo_url,
    cars.price,
    cars.mileage,
    cars.year,
    cars.date_posted,
    cars.active,
  ] */











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
