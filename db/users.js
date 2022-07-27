const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const {rows: [user]} = await client.query(`
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING (username);
    `,[username, password])
//  console.log(user, 'user being created by createUser()')
    return user
  } catch (error) {
    console.error
    throw error
  }
}

async function getUser({ username, password }) {
  try {
    const {rows: [user]} = await client.query(`
    SELECT id, username
    FROM users
    WHERE username=$1 AND password=$2;
    `,[username, password])

return user
  } catch (error) {
    console.error
    throw error
  }

}

async function getUserById(userId) {
try { 
  const {rows}= await client.query(`
  SELECT id, username, password
  FROM users
  WHERE id=$1;
  `, [userId])
  // console.log(rows.id, "this is users")
  return rows
} catch (error) {
  console.error
  throw error
}
}

async function getUserByUsername(userName) {
try {
  const {rows: [user]} = await client.query(`
SELECT *
FROM users
WHERE username=$1;
`, [userName,])
return user
} catch (error) {
  console.error
  throw error;
}
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
