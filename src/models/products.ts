import DB from "../configs/database";

export type Product = {
  id?: number;
  product_name: String;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product ${err}`);
    }
  }
  async show(prdouct_id: number): Promise<Product> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM products WHERE id = ($1) ";
      const result = await conn.query(sql, [prdouct_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product ${err}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO products (product_name,price) VALUES($1,$2) RETURNING *";
      const result = await conn.query(sql, [
        product.product_name,
        product.price,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not crate product ${err}`);
    }
  }
  async delete(id: number): Promise<Product[]> {
    try {
      const conn = await DB.connect();
      const sql = "DELETE FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`couldn't delete`);
    }
  }
}
