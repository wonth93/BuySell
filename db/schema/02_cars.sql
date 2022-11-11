-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS cars CASCADE;
DROP TABLE IF EXISTS widgets;
-- CREATE TABLE widgets (
--   id SERIAL PRIMARY KEY NOT NULL,
--   user_id INTEGER REFERENCES users(id),
--   name VARCHAR(255) NOT NULL
-- );


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
  date_posted TIMESTAMP,

  -- country VARCHAR(255) NOT NULL,
  -- street VARCHAR(255) NOT NULL,
  -- city VARCHAR(255) NOT NULL,
  -- province VARCHAR(255) NOT NULL,
  -- post_code VARCHAR(255) NOT NULL,

  active BOOLEAN NOT NULL DEFAULT TRUE
);
