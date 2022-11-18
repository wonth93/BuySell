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

// Get all cars to homepage
router.get("/", (req, res) => {
  carQueries
    .getAllCars()
    .then((cars) => {
      res.send({ cars });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Filter listing by price
router.get("/price", (req, res) => {
  const minimumPrice = parseInt(req.query.minimum_price) || 0;
  const maximumPrice = parseInt(req.query.maximum_price);

  // Filter will not work when user leave max and min price box empty
  if (!minimumPrice && !maximumPrice) {
    res.status(400);
  }

  carQueries
    .getCarsByPrice(maximumPrice, minimumPrice)
    .then((cars) => {
      res.send({ cars });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get single car info
router.get("/:id", (req, res) => {
  const { id } = req.params;

  carQueries
    .getSingleCar(id)
    .then((car) => {
      res.json(car);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Mark sold
router.post("/:id/sold", (req, res) => {
  const id = req.params.id;

  carQueries
    .markSold(id)
    .then(() => {
      res.redirect("/");
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
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Delete listing
router.post("/:id/delete", (req, res) => {
  const id = req.params.id;

  carQueries
    .deleteListing(id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
