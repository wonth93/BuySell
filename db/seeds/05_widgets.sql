-- Widgets table seeds here (Example)
-- INSERT INTO widgets (name, user_id) VALUES ('Sprockets', 1);
-- INSERT INTO widgets (name, user_id) VALUES ('Chains', 2);
-- INSERT INTO widgets (name, user_id) VALUES ('Bearings', 2);

DELETE FROM cars;
DELETE FROM cars_favourites;
DELETE FROM messages;



INSERT INTO cars (seller_id, title, manufacturer, condition, description, thumbnail_photo_url, cover_photo_url, price, mileage, year, date_posted, active)
VALUES (1, 'Subaru WRX STi', 'Subaru', 'Like New', 'All maintance are up-to-date', 'https://images.unsplash.com/photo-1663641621296-33f8c7eca9b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 'https://images.unsplash.com/photo-1663641582241-d1c888034818?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 40000, 105000, 2015, '2018-02-12T08:06:00.000Z', true),
(1, 'BMW E36', 'BMW', 'Fair', 'It is a fun car to drive', 'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80', 'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80', 60000, 15000, 2003, '2018-02-13T08:06:00.000Z', true),
(2, 'Nissan GTR', 'Nissan', 'Good', 'So sad to let it go', 'https://images.unsplash.com/photo-1602977050077-a669542f8dd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', 'https://images.unsplash.com/photo-1602977050077-a669542f8dd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', 50000, 18000, 2004, '2018-02-14T08:06:00.000Z', true),
(2, 'Mini Cooper', 'Mini', 'Like New', 'Thanks for all the memories', 'https://images.unsplash.com/photo-1659386165246-6dbdb49ed3d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80', 'https://images.unsplash.com/photo-1659386165246-6dbdb49ed3d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80', 80000, 17000, 2005, '2018-02-15T08:06:00.000Z', true),
(2, 'Mitsubishi Lancer Evolution IX', 'Mitsubishi', 'New', 'It is my daily', 'https://images.unsplash.com/photo-1659386165246-6dbdb49ed3d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80', 'https://images.unsplash.com/photo-1659386165246-6dbdb49ed3d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80', 85000, 27000, 2006, '2018-02-16T08:06:00.000Z', true);

INSERT INTO cars_favourites (buyer_id, car_id, date_like)
VALUES (1, 3, '2018-02-17T08:06:00.000Z'),
(1, 5, '2018-02-18T08:06:00.000Z'),
(2, 1, '2018-02-19T08:06:00.000Z');


INSERT INTO messages (sender_id, seller_id, car_id, date_sent, message)
VALUES (2, 1, 1, '2018-02-20T08:06:00.000Z', 'Hi there!'),
(1, 2, 1, '2018-02-21T08:06:00.000Z', 'How are you doing');
