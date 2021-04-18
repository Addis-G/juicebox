const client = require("../db-client.js");
const getPostsByUser = require("../posts/getPostsByUser.js");
async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT *
          FROM users
          WHERE id=${userId};`
    );
    if (!user) return null;
    delete user.password;

    const { rows } = await getPostsByUser(userId);
    user.posts = rows;
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
}
module.exports = getUserById;
