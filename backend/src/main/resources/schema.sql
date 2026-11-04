CREATE DATABASE IF NOT EXISTS shoplist_db;
USE shoplist_db;

CREATE TABLE IF NOT EXISTS shop_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50),
    description VARCHAR(255),
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category_id BIGINT,
    default_unit VARCHAR(50) DEFAULT 'piece',
    minimum_stock DOUBLE DEFAULT 0.0,
    FOREIGN KEY (category_id) REFERENCES shop_categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS shopping_lists (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'ACTIVE'
);

CREATE TABLE IF NOT EXISTS shopping_list_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    list_id BIGINT NOT NULL,
    item_id BIGINT,
    item_name VARCHAR(150) NOT NULL,
    category_id BIGINT,
    planned_quantity DOUBLE NOT NULL DEFAULT 1.0,
    received_quantity DOUBLE,
    unit VARCHAR(50) DEFAULT 'piece',
    status VARCHAR(50) DEFAULT 'PENDING',
    estimated_price DOUBLE DEFAULT 0.0,
    actual_price DOUBLE DEFAULT 0.0,
    notes TEXT,
    FOREIGN KEY (list_id) REFERENCES shopping_lists(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES shop_categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    item_id BIGINT NOT NULL UNIQUE,
    current_quantity DOUBLE NOT NULL DEFAULT 0.0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    item_id BIGINT NOT NULL,
    transaction_type VARCHAR(50) NOT NULL, -- PURCHASE, CONSUMPTION, ADJUSTMENT
    quantity DOUBLE NOT NULL,
    transaction_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS item_prices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(150) NOT NULL,
    category_id BIGINT,
    price DOUBLE NOT NULL,
    unit VARCHAR(50) DEFAULT 'kg',
    shop_name VARCHAR(150),
    notes TEXT,
    updated_at DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (category_id) REFERENCES shop_categories(id) ON DELETE SET NULL
);
