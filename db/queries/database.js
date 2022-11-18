const db = require("../connection");

// Get all user
const getUsers = () => {
  return db
    .query("SELECT * FROM users;")
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Get all car post on home page
const getAllCars = () => {
  return db.query(`
    SELECT *
    FROM cars
    ORDER BY date_posted;`)
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Query for filter function
const getCarsByPrice = (maximumPrice, minimumPrice) => {
  return db
    .query(`
      SELECT *
      FROM cars
      WHERE price <= $1 AND price >= $2;
      `,
      [
        maximumPrice,
        minimumPrice,
      ]
    )
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Query for user's listings
const getMyListings = (user_id) => {
  return db
    .query(`
      SELECT cars.*
      FROM cars
      INNER JOIN users ON users.id = seller_id
      WHERE seller_id = $1
      ORDER BY cars.date_posted;
      `, [user_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Query for user's favourite car
const getMyFavourites = (user_id) => {
  return db
    .query(`
      SELECT cars.*, cars_favourites.id AS car_fav_id
      FROM cars_favourites
      INNER JOIN users ON users.id = buyer_id
      INNER JOIN cars ON cars.id = car_id
      WHERE buyer_id = $1;
      `, [user_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Insert new listng to database
const createNewListing = (cars) => {
  return db
    .query(`
      INSERT INTO cars (seller_id, title, manufacturer, condition, description, thumbnail_photo_url, cover_photo_url, price, mileage, year)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
      ]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Insert new favourite car to database
const addFavourite = (buyerId, carId) => {
  return db
    .query(`
      INSERT INTO cars_favourites (buyer_id, car_id)
      VALUES ($1, $2);
      `,
      [
        buyerId,
        carId
      ]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Delect cars from my favourites
const removeFavourite = (car_fav_id) => {
  return db
    .query(`
    DELETE FROM cars_favourites WHERE id = $1
    `, [car_fav_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// Query for user's message inbox
const getMyMessages = (user_id) => {
  return db
    .query(`
      SELECT messages.*, users.name AS senderid, cars.title AS carid
      FROM messages
      INNER JOIN users ON users.id = sender_id
      INNER JOIN cars ON cars.id = car_id
      WHERE receiver_id = $1
      ORDER BY date_sent
      `,[user_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Insert new message to database
const sendMessage = (sender, receiver, carId, message) => {
  return db
    .query(`
    INSERT INTO messages (sender_id, receiver_id, car_id, message)
    VALUES ($1, $2, $3, $4)
    `, [
        sender,
        receiver,
        carId,
        message
      ]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
}

module.exports = {
  getUsers,
  getAllCars,
  getCarsByPrice,
  getMyListings,
  getMyFavourites,
  createNewListing,
  addFavourite,
  getMyMessages,
  removeFavourite,
  sendMessage,
};
