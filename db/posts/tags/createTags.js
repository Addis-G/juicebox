const client = require("../../db-client.js");
async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertValues = tagList.map((_, index) => `$${index + 1}`).join("), (");

  const selectValues = tagList.map((_, index) => `$${index + 1}`).join(", ");

  try {
    await client.query(
      `INSERT INTO tags(name)
         VALUES  (${insertValues})  
         ON CONFLICT (name) DO NOTHING ; `,
      tagList
    );

    const { rows } = await client.query(
      `
                  SELECT id,name
                  FROM tags
                  WHERE name in (${selectValues});
    
      `,
      tagList
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
module.exports = createTags;
