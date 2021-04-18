const client = require("../db-client.js");
async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username ,name,location,active
        FROM users;
      `
  );

  return rows;
}
module.exports = getAllUsers;
