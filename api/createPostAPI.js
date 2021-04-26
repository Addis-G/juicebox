const createPost = require("../db/posts/createPost.js");
async function createPostAPI(req, res, next) {
  const { title, content, tags = "" } = req.body;

  const { user } = req;

  const tagArr = tags.trim().split(/\s+/);
  const postData = {};

  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    postData.title = title;
    postData.content = content;
    postData.authorId = user.id;

    const post = await createPost(postData);
    res.send(post);
  } catch ({ name, message }) {
    next({ name, message });
  }
}

module.exports = createPostAPI;
