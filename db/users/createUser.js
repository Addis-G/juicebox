const client = require("../db-client.js");
async function createUser({ username, password, name, location }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          INSERT INTO users(username, password, name, location) 
          VALUES ($1, $2,$3, $4) 
          ON CONFLICT (username) DO NOTHING 
          RETURNING 
           id, username , name, location, active
        ;
        `,
      [username, password, name, location]
    );

    return user;
  } catch (error) {
    throw error;
  }
}
module.exports = createUser;
