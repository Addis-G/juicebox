const createPostTag = require("../createPostTag.js");
const getPostById = require("../getPostsById.js");
async function addTagsToPost(postId, tagList) {
  try {
    const createPostTagPromises = tagList.map((tag) =>
      createPostTag(postId, tag.id)
    );

    await Promise.all(createPostTagPromises);

    return await getPostById(postId);
  } catch (error) {
    throw error;
  }
}
module.exports = addTagsToPost;
