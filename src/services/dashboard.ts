import DB from "../configs/database";

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await DB.connect();
      const sql =
        "SELECT product_name, price, order_id FROM products INNER JOIN orderd_products ON products.id = orderd_products.id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
  // Get all users that have made orders
  async fiveMostExpensive(): Promise<{ name: string; price: number }[]> {
    try {
      //@ts-ignore
      const conn = await DB.connect();
      const sql =
        "SELECT product_name, price FROM products ORDER BY price DESC LIMIT 5";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`);
    }
  }
  // Get all users that have made orders
  async usersWithOrders(): Promise<{ firstName: string; lastName: string }[]> {
    try {
      //@ts-ignore
      const conn = await DB.connect();
      const sql =
        "SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }
}
