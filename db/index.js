const { Client } = require("pg");
const client = new Client("postgres://localhost:5432/juicebox");

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username ,name,location,active
      FROM users;
    `
  );

  return rows;
}

async function createUser({ username, password, name, location }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password, name, location) 
        VALUES($1, $2,$3, $4) 
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

async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function createPost({ authorId, title, content }) {
  try {
    const { rows } = client.query(
      `INSERT INTO posts("authorId", title, content)
        VALUES( $1, $2, $3)
        RETURNING * `,
      [authorId, title, content]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function updatePost(id, { title, content, active }) {
  //   const setString = Object.keys(fields)
  //     .map((key, index) => `"${key}"=$${index + 1}`)
  //     .join(", ");

  // return early if this is called without fields
  //   if (setString.length === 0) {
  //     return;
  //   }
  console.log(id, title, content, active);
  try {
    const rows = await client.query(
      `UPDATE posts 
         SET content='${content}',title='${title}'
         WHERE id=${id}
         RETURNING id,title,content;`
    );
    console.log(rows);
  } catch (error) {
    throw error;
  }
}
async function getAllPosts() {
  try {
    const { rows: posts } = await client.query(
      `SELECT id, "authorId" ,title ,content ,active
       FROM posts;`
    );
    return posts;
  } catch (error) {
    throw error;
  }
}

async function getPostsByUser(userId) {
  console.log(userId);
  try {
    const rows = client.query(`
        SELECT id, "authorId", title, content, active 
        FROM posts
        WHERE "authorId"=${userId};
      `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT *
        FROM users
        WHERE id=${userId}`
    );
    if (!user) return null;

    const { rows } = await getPostsByUser(userId);

    user.posts = [...rows];
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  client,
  getAllUsers,
  createUser,
  updateUser,
  createPost,
  updatePost,
  getAllPosts,
  getPostsByUser,
  getUserById,
};
