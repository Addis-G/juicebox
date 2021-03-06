const client = require("../db-client.js");
const getPostById = require("./getPostsById.js");
async function getPostsByUser(userId) {
  try {
    const { rows: postIds } = await client.query(`
        SELECT id 
        FROM posts 
        WHERE "authorId"=${userId};
      `);

    const posts = await Promise.all(
      postIds.map((post) => getPostById(post.id))
    );

    return posts;
  } catch (error) {
    throw error;
  }
}
module.exports = getPostsByUser;
