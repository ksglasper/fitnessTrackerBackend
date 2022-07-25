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

  console.log(activity, 'here is the activity please be an object')
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
    
  }
}

async function getActivityById(id) {}

async function getActivityByName(name) {}

async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, ...fields }) {
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
