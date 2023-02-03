import bcrypt from "bcrypt";
import dotenv from "dotenv";
import DB from "../configs/database";

dotenv.config();
const pepper: any = process.env.BCRYPT_PASSWORD;
const saltRound: any = process.env.SALT_ROUNDS;

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async show(id: number): Promise<User> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM users WHERE id = ($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get ${err}`);
    }
  }
  async index(): Promise<User[]> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get ${err}`);
    }
  }
  async create(user: User): Promise<User> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO users (first_name, last_name, pwd) VALUES($1,$2,$3) RETURNING *";
      const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRound));
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create user ${err}`);
    }
  }
  async delete(id: number): Promise<User[]> {
    try {
      const conn = await DB.connect();
      const sql = "DELETE FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`couldn't delete ${error}`);
    }
  }
}
