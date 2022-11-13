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

const getMyListings = () => {
  return db.query("SELECT * FROM cars INNER JOIN users ON users.id = seller_id WHERE users.id = 1")
  .then((result) => {
    return result.rows;
  })
  .then((error) => {
    console.log(error.message);
  });
}

module.exports = { getUsers, getAllCars, getMyListings };
