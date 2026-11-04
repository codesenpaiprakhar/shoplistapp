-- Default Shop Categories
INSERT IGNORE INTO shop_categories (id, name, icon, description, display_order) VALUES
(1, 'Vegetable Shop', 'Carrot', 'Fresh greens, onions, potatoes, tomatoes, and herbs', 1),
(2, 'Dairy & Milk Booth', 'Milk', 'Milk pouches, curd, paneer, butter, cheese, and eggs', 2),
(3, 'Grocery Store / Kirana', 'ShoppingBag', 'Rice, flour (atta), pulses (dal), spices, cooking oils, sugar, tea', 3),
(4, 'Fruit Shop', 'Apple', 'Seasonal fresh fruits, bananas, apples, oranges', 4),
(5, 'Bakery', 'Wheat', 'Bread, buns, cookies, rusks, cakes', 5),
(6, 'Meat & Fish Market', 'Fish', 'Chicken, mutton, fish, seafood', 6),
(7, 'Chemist & Personal Care', 'HeartPulse', 'Toothpaste, soap, shampoo, basic first aid and OTC medicines', 7);

-- Sample Trackable Items
INSERT IGNORE INTO items (id, name, category_id, default_unit, minimum_stock) VALUES
(1, 'Tomatoes', 1, 'kg', 1.0),
(2, 'Onions', 1, 'kg', 2.0),
(3, 'Potatoes', 1, 'kg', 2.0),
(4, 'Spinach (Palak)', 1, 'bunch', 1.0),
(5, 'Full Cream Milk', 2, 'litre', 1.0),
(6, 'Fresh Paneer', 2, 'g', 250.0),
(7, 'Basmati Rice', 3, 'kg', 5.0),
(8, 'Wheat Flour (Atta)', 3, 'kg', 5.0),
(9, 'Toor Dal', 3, 'kg', 1.0),
(10, 'Mustard / Sunflower Oil', 3, 'litre', 2.0),
(11, 'Bananas', 4, 'dozen', 1.0),
(12, 'Apples', 4, 'kg', 1.0),
(13, 'Whole Wheat Bread', 5, 'packet', 1.0);

-- Default Shopping List
INSERT IGNORE INTO shopping_lists (id, name, created_at, status) VALUES
(1, 'This Weekend Market Trip', NOW(), 'ACTIVE');

-- Default Shopping List Items
INSERT IGNORE INTO shopping_list_items (id, list_id, item_id, item_name, category_id, planned_quantity, unit, status, estimated_price, notes) VALUES
(1, 1, 1, 'Tomatoes', 1, 2.0, 'kg', 'PENDING', 60.0, 'Firm and ripe'),
(2, 1, 2, 'Onions', 1, 3.0, 'kg', 'PENDING', 90.0, 'Medium sized'),
(3, 1, 5, 'Full Cream Milk', 2, 2.0, 'litre', 'PENDING', 130.0, '2 packets of 1L'),
(4, 1, 6, 'Fresh Paneer', 2, 500.0, 'g', 'PENDING', 200.0, 'For dinner'),
(5, 1, 7, 'Basmati Rice', 3, 5.0, 'kg', 'PENDING', 450.0, 'Standard royal brand'),
(6, 1, 11, 'Bananas', 4, 1.0, 'dozen', 'PENDING', 60.0, 'Slightly yellow/green'),
(7, 1, 13, 'Whole Wheat Bread', 5, 1.0, 'packet', 'PENDING', 45.0, 'Check manufacturing date');

-- Starter Item Price Catalog Records
INSERT IGNORE INTO item_prices (id, item_name, category_id, price, unit, shop_name, notes, updated_at) VALUES
(1, 'Fresh Tomatoes', 1, 30.0, 'kg', 'Mandi Stall #4', 'Best price on Sunday', CURRENT_DATE),
(2, 'Onions', 1, 30.0, 'kg', 'Vegetable Corner', 'Wholesale 5kg bag', CURRENT_DATE),
(3, 'Potatoes', 1, 25.0, 'kg', 'Mandi Stall #4', 'Pahari variety', CURRENT_DATE),
(4, 'Spinach (Palak)', 1, 25.0, 'bunch', 'Local Vendor', 'Fresh greens', CURRENT_DATE),
(5, 'Full Cream Milk', 2, 65.0, 'litre', 'Mother Dairy', 'Packet price', CURRENT_DATE),
(6, 'Fresh Paneer', 2, 400.0, 'kg', 'Dairy Booth', 'Loose fresh', CURRENT_DATE),
(7, 'Basmati Rice', 3, 90.0, 'kg', 'Kirana Superstore', 'Royal Rozana', CURRENT_DATE),
(8, 'Toor Dal', 3, 160.0, 'kg', 'Wholesale Kirana', 'Unpolished', CURRENT_DATE),
(9, 'Sunflower Oil', 3, 140.0, 'litre', 'Grocery Store', 'Fortune pouch', CURRENT_DATE),
(10, 'Bananas', 4, 60.0, 'dozen', 'Fruit Cart', 'Robusta', CURRENT_DATE),
(11, 'Apples', 4, 180.0, 'kg', 'Fruit Stall', 'Kinnaur apples', CURRENT_DATE),
(12, 'Whole Wheat Bread', 5, 45.0, 'packet', 'Corner Bakery', 'Standard 400g', CURRENT_DATE);
