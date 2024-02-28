CREATE DATABASE IF NOT EXISTS dayareka;

USE dayareka;

CREATE TABLE IF NOT EXISTS customer_level (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    level_id INT,
    FOREIGN KEY (level_id) REFERENCES customer_level(id)
);

CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS fav_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    customer_id INT,
    FOREIGN KEY (item_id) REFERENCES items(id),
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);

CREATE TABLE IF NOT EXISTS invoice (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);

CREATE TABLE IF NOT EXISTS transaction_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT,
    item_id INT,
    quantity INT,
    FOREIGN KEY (invoice_id) REFERENCES invoice(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);

INSERT INTO customer_level (level) VALUES
('warga'),
('juragan'),
('sultan'),
('konglomerat');

INSERT INTO customer (name, level_id) VALUES
('John Doe', 1),
('Alice Smith', 2),
('Bob Johnson', 3),
('Emily Brown', 4),
('Michael Wilson', 1),
('Emma Jones', 2),
('James Davis', 3),
('Olivia Taylor', 4),
('William Martinez', 1),
('Sophia Anderson', 2),
('David Thomas', 3),
('Charlotte White', 4),
('Daniel Clark', 1),
('Mia Harris', 2),
('Matthew Lee', 3),
('Amelia Walker', 4),
('Joseph Hall', 1),
('Ella King', 2),
('Samuel Baker', 3),
('Grace Green', 4);

INSERT INTO items (name, price) VALUES
('Chicken Sandwich', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Vegetable Soup', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Cheeseburger', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Caesar Salad', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Pasta Carbonara', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Margherita Pizza', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Fruit Smoothie', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Iced Coffee', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Lemonade', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Chicken Caesar Salad', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Grilled Salmon', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Vegetable Stir-Fry', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Spaghetti Bolognese', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Mango Smoothie', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Hot Chocolate', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Milkshake', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Fish Tacos', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Caprese Salad', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('French Toast', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3)),
('Cobb Salad', ROUND(ROUND(RAND() * (49 - 1) + 1) * 1000, -3));


-- Sample data for fav_item table
INSERT INTO fav_item (item_id, customer_id)
SELECT DISTINCT item_id, customer_id
FROM (
  SELECT FLOOR(RAND() * 20) + 1 AS item_id, FLOOR(RAND() * 20) + 1 AS customer_id
  FROM information_schema.tables
  LIMIT 50
) AS random_data;

-- Sample data for invoice table
INSERT INTO invoice (customer_id)
SELECT DISTINCT customer_id
FROM fav_item
ORDER BY RAND()
LIMIT 30;

-- Sample data for transaction_item table
INSERT INTO transaction_item (invoice_id, item_id, quantity)
SELECT invoice_id, item_id, FLOOR(RAND() * 5) + 1
FROM (
  SELECT id AS invoice_id FROM invoice ORDER BY RAND() LIMIT 30
) AS random_invoices
CROSS JOIN (
  SELECT DISTINCT item_id FROM fav_item ORDER BY RAND() LIMIT 20
) AS item_ids
LIMIT 100;
