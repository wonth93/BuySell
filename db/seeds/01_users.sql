-- Users table seeds here (Example)
-- INSERT INTO users (name) VALUES ('Alice');
-- INSERT INTO users (name) VALUES ('Kira');

DELETE FROM users;

INSERT INTO users (name, email, password)
VALUES ('Admin User', 'admin@gmail.com', 'password'),
('Non Admin', 'user@gmail.com', 'password');

