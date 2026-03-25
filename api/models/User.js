const db = require("../database/connect");

class User {
  constructor({ id, username, password }) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static async findByUsername(username) {
    const response = await db.query(
      "SELECT * FROM users WHERE username = $1;",
      [username],
    );

    if (response.rows.length === 0) {
      return null;
    }

    return new User(response.rows[0]);
  }

  static async createUser({ username, password }) {
    const response = await db.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;`,
      [username, password],
    );

    if (response.rows.length !== 1) {
      throw new Error("Unable to create user.");
    }

    return new User(response.rows[0]);
  }

  static async insertScore({ user_id, score }) {
    const response = await db.query(
      `INSERT INTO result (user_id, score) VALUES ($1, $2) RETURNING *`,
      [user_id, score],
    );

    if (response.rows.length !== 1) {
      throw new Error("Unable to post score");
    }

    return response.rows[0];
  }
}

module.exports = User;
