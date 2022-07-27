const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
try {
  const {rows: [routines]} = await client.query(`
  INSERT INTO routines("creatorId", "isPublic", name, goal)
  VALUES ($1,$2,$3,$4)
  ON CONFLICT (name) DO NOTHING
  RETURNING *;
  `,[creatorId, isPublic, name, goal])
// console.log(routines, 'routine we created from createRoutine()')
  return routines
} catch (error) {
  console.error
  throw error
}



}

async function getRoutineById(id) {}







async function getRoutinesWithoutActivities() {}






async function getAllRoutines() {
try {
const {rows} = await client.query(`
SELECT routines.*
FROM routines;
`)
console.log(rows, 'created join row')
return rows
}catch (error) {
  console.error
  throw error
}


}






async function getAllPublicRoutines() {}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {}

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
