const client = require("./db-client.js");
const getAllUsers = require("./users/getAllUsers.js");
const createUser = require("./users/createUser.js");
const updateUser = require("./users/updateUser.js");
const createPost = require("./posts/createPost.js");
const updatePost = require("./posts/updatePost.js");
const getUserById = require("./users/getUserById.js");
const createTags = require("./posts/tags/createTags.js");
const getAllPosts = require("./posts/getAllPosts.js");
const getPostsByUser = require("./posts/getPostsByUser.js");
const addTagsToPost = require("./posts/tags/addTagsToPost.js");
const getPostsByTagName = require("./posts/getPostsByTagName.js");
const dropTables = require("./dropTables.js");
const createTables = require("./createTables.js");
const createInitialUsers = require("./createInitialUsers.js");
const createInitialPosts = require("./createInitialPosts.js");
const createInitialTags = require("./createInitialTags.js");

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialPosts();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    console.log("Finished database tests!");

    console.log("Calling updateUser on users[0]");
    const updateUserResult = await updateUser(users[0].id, {
      name: "Newname Sogood",
      location: "Lesterville, KY",
    });
    console.log("Result:", updateUserResult);

    console.log("Calling getAllPosts");
    const posts = await getAllPosts();
    console.log("Result:", posts);

    console.log("Calling updatePost on posts[0]");
    const updatePostResult = await updatePost(posts[0].id, {
      title: "New Title",
      content: "Updated Content",
    });

    console.log("Calling updatePost on posts[1], only updating tags");
    const updatePostTagsResult = await updatePost(posts[1].id, {
      tags: ["#youcandoanything", "#redfish", "#bluefish"],
    });
    console.log("Result:", updatePostTagsResult);

    console.log("Result:", updatePostResult);

    console.log("Calling getUserById with 1");
    const albert = await getUserById(1);
    console.log("Result:", albert);

    console.log("Calling getPostsByTagName with #happy");
    const postsWithHappy = await getPostsByTagName("#happy");
    console.log("Result:", postsWithHappy);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
