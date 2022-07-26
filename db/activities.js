const client = require("./client");

// database functions
async function createActivity({ name, description }) {
  try {
    // let newName = name.toLowerCase()
  const {rows:[activity]} = await client.query(`
  INSERT INTO activities(name, description)
  VALUES ($1, $2)
  ON CONFLICT (name) DO NOTHING
  RETURNING *;
  `,[name, description])

  // console.log(activity, 'here is the activity please be an object')
  return activity
  } catch (error) {
    console.error
  }
}

async function getAllActivities() {
  try {
    const {rows} = await client.query(`
    SELECT *
    FROM activities;
    `)
    return rows
  } catch (error) {
    console.error
    throw error
  }
}

async function getActivityById(id) {
  try {
    const {rows: [activities]} = await client.query(`
    SELECT *
    FROM activities
    WHERE id=$1;
    `,[id])
    // console.log(activities.id, "this should be activities")
    return activities
  } catch (error) {
    console.error
    throw error
  }
}

async function getActivityByName(name) {
  try {
    const {rows: [activities]} = await client.query(`
    SELECT *
    FROM activities
    WHERE name=$1
    `, [name])
    return activities
  } catch (error) {
    console.error
    throw error
  }
}

async function attachActivitiesToRoutines(routines) {}




async function updateActivity({ id, ...fields}) {
  console.log(id, "this is ID")
  console.log(Object.keys(fields), 'this is fields')
  console.log(Object.values(fields))
  const setString = Object.keys(fields)
  .map((key,idx)=>{`"${key}"=$${idx + 1}`})
  .join(',');
  console.log(setString, "this is SETSTRING")
  try {
    const {rows: activities} = await client.query(`
    UPDATE activities
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `,Object.values(fields))
    return activities
  } catch (error) {
    console.error
    throw error
  }
  
  
  
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
