const client = require("./client");
const {attachActivitiesToRoutines} = require('./activities');

async function createRoutine({ creatorId, isPublic, name, goal }) {
try {
//  console.log(creatorId, ";;;;;;;;;;" )
  const {rows: [routines]} = await client.query(`
  INSERT INTO routines("creatorId", "isPublic", name, goal)
  VALUES ($1,$2,$3,$4)
  RETURNING *;
  `,[creatorId, isPublic, name, goal])
// console.log(routines, 'routine we created from createRoutine()')
  return routines
} catch (error) {
  console.error
  throw error
}
}

async function getRoutineById(id) {
  
try {
  const {rows: [routine]} = await client.query(`
  SELECT *
  FROM routines
  WHERE id=$1;
  `,[id])

  return routine
} catch (error) {
  console.error
  throw error
}

}







async function getRoutinesWithoutActivities() {
try {
// console.log('in the function before it breaks')
  const {rows} = await client.query(`
  SELECT *
  FROM routines;
  `)
  console.log(rows, 'Order really matters here')
  return rows
} catch (error) {
  console.error
  throw error
}


}






async function getAllRoutines() {
try {
const {rows: routines} = await client.query(`
SELECT routines.*, users.username AS "creatorName"
FROM routines
JOIN users ON routines."creatorId"=users.id;
`)
// console.log(rows,'before ed function')
// console.log(rows, 'the rows')
// console.log(routines, 'what we pass into function')
// const routinesToReturn = await attachActivitiesToRoutines(routines)
// console.log(routinesToReturn, 'result from attach function')

return attachActivitiesToRoutines(routines)
}catch (error) {
  console.error
  throw error
}
}

// SELECT routines.*, users.username AS "creatorName" 
// FROM routines
// JOIN users ON routines."creatorId"=users.id;




async function getAllPublicRoutines() {

  try {
    const {rows} = await client.query(`
    SELECT routines.*, users.username AS "creatorName" 
    FROM routines
    JOIN users ON  routines."creatorId"=users.id
    WHERE "isPublic"='true';
    `)
    const routinesToReturn = await attachActivitiesToRoutines(rows)
    
    return routinesToReturn
    }catch (error) {
      console.error
      throw error
    }


}

async function getAllRoutinesByUser({ username }) {
  try {
    const {rows: routines} = await client.query(`
    SELECT routines.*, users.username AS "creatorName" 
    FROM routines
    JOIN users ON  routines."creatorId"=users.id
    WHERE "username"=$1;
    `,[username])
    
    return attachActivitiesToRoutines(routines)
    }catch (error) {
      console.error
      throw error
    }


}

async function getPublicRoutinesByUser({ username }) {
  try {
    const {rows: routines} = await client.query(`
    SELECT routines.*, users.username AS "creatorName" 
    FROM routines
    JOIN users ON  routines."creatorId"=users.id
    WHERE "isPublic"='true' AND "username"=$1;
    `,[username])
    
    return attachActivitiesToRoutines(routines)
    }catch (error) {
      console.error
      throw error
    }


}

async function getPublicRoutinesByActivity({ id }) {
  //given activity id
  try {
    const {rows: routines} = await client.query(`
    SELECT routines.*, users.username AS "creatorName", routine_activities."activityId"
    FROM routines
    JOIN users ON routines."creatorId"=users.id
    JOIN routine_activities ON routines.id=routine_activities."routineId"
    WHERE "activityId"=$1 AND "isPublic"='true';
    `,[id])
    
    return attachActivitiesToRoutines(routines)
    }catch (error) {
      console.error
      throw error
    }

}

async function updateRoutine({ id, ...fields }) {



}

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
