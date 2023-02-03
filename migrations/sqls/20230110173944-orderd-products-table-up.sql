/* Replace with your SQL commands */
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
);