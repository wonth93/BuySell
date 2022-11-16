-- Users table seeds here (Example)
-- INSERT INTO users (name) VALUES ('Alice');
-- INSERT INTO users (name) VALUES ('Kira');

DELETE FROM users;

INSERT INTO users (name, email, password)
VALUES ('User 1', 'admin@gmail.com', 'password'),
('User 2', 'user@gmail.com', 'password');

