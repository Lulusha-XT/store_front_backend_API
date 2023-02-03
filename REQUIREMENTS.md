# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index (GET `/api/product` )
- Show (GET `/api/product/:id`)
- Create [token required] (POST `/api/product`)

#### Users

- Index [token required] (GET `/api/user`)
- Show [token required] (GET `/api/user/:id`)
- Create (POST `/api/user`)

#### Order

- Index [token required] (GET `/api/order`)
- Create (POST `/api/order`)
- IndexOrderedProduct [token required] (GET `/api/order/orderedproduct`)
- CreateOrderedProduct [token required] (POST `/api/order/orderedproduct`)
- Current Order by user (args: user id)[token required] (GET `/api/orders/currentorder/:userId`)
- Complete Order by user (args: user id)[token required] (GET `/api/orders/currentorder/:userId`)

## Data Shapes

#### Product

he table includes the following fields:

- id
- name
- price
  The SQL schema for this table is as follows:

````sql
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR NOT NULL,
    price integer NOT NULL
);```

#### User
The table includes the following fields:
- id
- firstName
- lastName
- password
The SQL schema for this table is as follows:
```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    pwd VARCHAR NOT NULL
);```

#### Orders
The table includes the following fields:
- id
- user_id
- status of order (active or complete)
The SQL schema for this table is as follows:
```sql
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
        CONSTRAINT fk_orders_users
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);```

#### order_products
The table includes the following fields:
- id
- product_id
- order_id
- quantity
  The SQL schema for this table is as follows:
```
CREATE TABLE orderd_products(
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL ,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY (order_id)
            REFERENCES orders(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT fk_products
        FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE
            ON  UPDATE CASCADE
);```

````
