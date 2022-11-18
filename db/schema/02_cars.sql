-- Drop old tables
DROP TABLE IF EXISTS cars CASCADE;
DROP TABLE IF EXISTS cars_favourites CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

-- Create car info table
CREATE TABLE cars (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  manufacturer VARCHAR(255) NOT NULL,
  condition VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_photo_url VARCHAR(500) NOT NULL,
  cover_photo_url VARCHAR(500) NOT NULL,
  price INTEGER  NOT NULL DEFAULT 0,
  mileage INTEGER  NOT NULL DEFAULT 0,
  year INTEGER NOT NULL,
  date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN DEFAULT TRUE
);

-- Create favourite cars table
CREATE TABLE cars_favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  car_id INTEGER REFERENCES cars(id) ON DELETE CASCADE,
  date_like TIMESTAMP
);

-- Create messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  car_id INTEGER REFERENCES cars(id) ON DELETE CASCADE,
  date_sent TIMESTAMP,
  message TEXT
);
