const db = require("../connection");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const getAllCars = () => {
  return db.query("SELECT * FROM cars;").then((data) => {
    return data.rows;
  });
};

const getMyListings = (user_id) => {
  return db
    .query(
      `SELECT * FROM cars INNER JOIN users ON users.id = seller_id WHERE seller_id = $1`,
      [user_id]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getMyFavourites = (user_id) => {
  return db
    .query(
      `SELECT cars.* FROM cars_favourites INNER JOIN users ON users.id = buyer_id INNER JOIN cars ON cars.id = car_id WHERE buyer_id = $1`,
      [user_id]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const createNewListing = (cars) => {
  return db
    .query(
      `
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
      ]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = {
  getUsers,
  getAllCars,
  getMyListings,
  getMyFavourites,
  createNewListing,
};
