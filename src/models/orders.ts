import DB from "../configs/database";

export type Order = {
  id?: number;
  status: String;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders ${err}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *";
      const result = await conn.query(sql, [order.status, order.user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not crate order ${err}`);
    }
  }
  async indexOrderProduct(): Promise<Order[]> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM orderd_products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orderd prdoduct ${err}`);
    }
  }
  async createOrderProduct(
    quantity: number,
    productId: number,
    orderId: number
  ): Promise<Order> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO orderd_products (quantity , order_id , product_id ) VALUES($1,$2,$3) RETURNING *";
      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not crate order product ${err}`);
    }
  }
  async showCurrentOrder(userId: number): Promise<Order[]> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM orders WHERE user_id = ($1)";
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get current order product ${err}`);
    }
  }
  async showCommpletedOrder(userId: number): Promise<Order> {
    try {
      const conn = await DB.connect();
      const sql =
        "SELECT * FROM orders WHERE status = ($1) AND user_id  = ($2)";
      const result = await conn.query(sql, ["complet", userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get completd order ${err}`);
    }
  }
  async delete(id: number): Promise<Order[]> {
    try {
      const conn = await DB.connect();
      const sql = "DELETE FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`couldn't delete`);
    }
  }
}
