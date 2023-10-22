-- CREATE TABLE QUERIES

CREATE TABLE users(
    user_id VARCHAR(6),
    email VARCHAR(255),
    password VARCHAR(255),
    postal_code CHAR(6),
    PRIMARY KEY (user_id)
);

CREATE TABLE product(
	product_id VARCHAR(6),
	product_name VARCHAR(31),
	weight INT,
	brand VARCHAR(31),
	width INT,
	length INT,
	height INT,
	PRIMARY KEY (product_id)
);

CREATE TABLE category(
	category_id VARCHAR(6),
	category_name VARCHAR(63),
	PRIMARY KEY (category_id)
);

CREATE TABLE combo(
	combo_id VARCHAR(6),
	combo_price NUMERIC(5,0),
	combo_description VARCHAR(255),
	PRIMARY KEY (combo_id)
);

CREATE TABLE alerts(
    product_id VARCHAR(6),
    user_id VARCHAR(6),
    alert_price NUMERIC(5,0),
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users,
    FOREIGN KEY (product_id) REFERENCES product
);

CREATE TABLE availability(
	product_id VARCHAR(6),
	postal_code CHAR(6),
	quantity INT,
	PRIMARY KEY (product_id, postal_code),
    FOREIGN KEY (product_id) REFERENCES product
);

CREATE TABLE buyer(
	user_id VARCHAR(6),
	first_name VARCHAR(31),
	last_name VARCHAR(31),
	PRIMARY KEY(user_id),
    FOREIGN KEY (user_id) REFERENCES users
);

CREATE TABLE buys(
	user_id VARCHAR(6),
	product_id VARCHAR(6),
	price NUMERIC(5,0),
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users,
    FOREIGN KEY (product_id) REFERENCES product
);

CREATE TABLE category_products(
	category_id VARCHAR(6),
	product_id VARCHAR(6),
	PRIMARY KEY (category_id, product_id),
    FOREIGN KEY (category_id) REFERENCES category,
    FOREIGN KEY (product_id) REFERENCES product
);

CREATE TABLE combo_products(
	combo_id VARCHAR(6),
	product_id VARCHAR(6),
	quantity INT,
	PRIMARY KEY (combo_id, product_id),
    FOREIGN KEY (combo_id) REFERENCES combo,
    FOREIGN KEY (product_id) REFERENCES product
);

CREATE TABLE price_history(
	product_id VARCHAR(6),
	datetime TIMESTAMP,
	price NUMERIC(5,0),
	PRIMARY KEY (product_id, datetime),
    FOREIGN KEY (product_id) REFERENCES product
);

CREATE TABLE product_price(
	product_id VARCHAR(6),
	price INT,
	PRIMARY KEY (product_id),
    FOREIGN KEY (product_id) REFERENCES product
);

CREATE TABLE rating(
	product_id VARCHAR(6),
	user_id VARCHAR(6),
	rating int,
	PRIMARY KEY(product_id, user_id),
    FOREIGN KEY(product_id) REFERENCES product,
    FOREIGN KEY(user_id) REFERENCES users
);

CREATE TABLE sells(
	user_id VARCHAR(6),
	product_id VARCHAR(6),
	datetime TIMESTAMP,
	price NUMERIC(5,0),
	PRIMARY KEY(product_id, user_id, datetime),
    FOREIGN KEY(product_id) REFERENCES product,
    FOREIGN KEY(user_id) REFERENCES users
);

CREATE TABLE supplier(
	user_id VARCHAR(6),
	supplier_name VARCHAR(31),
	supplier_website VARCHAR(255),
	PRIMARY KEY(user_id),
    FOREIGN KEY(user_id) REFERENCES users
);

-- IMPORTING QUERIES

COPY users
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\users.csv'
DELIMITER ','
CSV HEADER;

COPY product
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\product.csv'
DELIMITER ','
CSV HEADER;

COPY combo
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\combo.csv'
DELIMITER ','
CSV HEADER;

COPY alerts
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\alerts.csv'
DELIMITER ','
CSV HEADER;

COPY availability
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\availability.csv'
DELIMITER ','
CSV HEADER;

COPY buyer
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\buyer.csv'
DELIMITER ','
CSV HEADER;

COPY buys
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\buys.csv'
DELIMITER ','
CSV HEADER;

COPY category
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\category.csv'
DELIMITER ','
CSV HEADER;

COPY category_products
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\category_products.csv'
DELIMITER ','
CSV HEADER;

COPY combo_products
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\combo_products.csv'
DELIMITER ','
CSV HEADER;

COPY price_history
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\price_history.csv'
DELIMITER ','
CSV HEADER;

COPY product_price
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\product_price.csv'
DELIMITER ','
CSV HEADER;

COPY rating
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\rating.csv'
DELIMITER ','
CSV HEADER;

COPY sells
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\sells.csv'
DELIMITER ','
CSV HEADER;

COPY supplier
FROM 'E:\PRICE HISTORY\pricehistory\DATA-files\supplier.csv'
DELIMITER ','
CSV HEADER;