-- Delete old users data
DELETE FROM users;

-- Create users data
INSERT INTO users (name, email, password)
VALUES ('User 1', 'admin@gmail.com', 'password'),
('User 2', 'user@gmail.com', 'password');
