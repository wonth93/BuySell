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

module.exports = { getUsers, getAllCars };
