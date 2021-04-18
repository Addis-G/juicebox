const client = require("../db-client.js");
const createTags = require("./tags/createTags.js");
const addTagsToPost = require("./tags/addTagsToPost.js");
async function createPost({
  authorId,
  title,
  content,
  tags = [], // this is new
}) {
  try {
    const {
      rows: [post],
    } = await client.query(
      `
        INSERT INTO posts("authorId", title, content) 
        VALUES($1, $2, $3)
        RETURNING *;
      `,
      [authorId, title, content]
    );

    const tagList = await createTags(tags);
    return await addTagsToPost(post.id, tagList);
  } catch (error) {
    throw error;
  }
}
module.exports = createPost;
