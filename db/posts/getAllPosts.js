const client = require("../db-client.js");
const getPostById = require("./getPostsById.js");
async function getAllPosts() {
  try {
    const { rows: postIds } = await client.query(`
        SELECT id
        FROM posts;
      `);

    const posts = await Promise.all(
      postIds.map((post) => getPostById(post.id))
    );

    return posts;
  } catch (error) {
    throw error;
  }
}
module.exports = getAllPosts;
