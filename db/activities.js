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
    const {rows: activities} = await client.query(`
    SELECT *
    FROM activities;
    `)
    return activities
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

async function attachActivitiesToRoutines(routines) {
  // no side effects
  // console.log(routines, "eds routines")
  const routinesToReturn = [...routines];
  // console.log('before try in ed function', routinesToReturn)
  // console.log(routinesToReturn, 'the copied array?')
  const binds = routines.map((_, index) => `$${index + 1}`).join(', ');
  const routineIds = routines.map(routine => routine.id);
  if (!routineIds?.length) return [];
  try {
    // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
    const { rows: activities } = await client.query(`
      SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
      FROM activities 
      JOIN routine_activities ON routine_activities."activityId" = activities.id
      WHERE routine_activities."routineId" IN (${ binds });
    `, routineIds);

    // console.log(routineIds, 'the ids in the ed function')
    // console.log(binds, 'binds in the ed function')

    // console.log(activities, 'in the ed function')

    // loop over the routines
    for(const routine of routinesToReturn) {
      // filter the activities to only include those that have this routineId
      const activitiesToAdd = activities.filter(activity => activity.routineId === routine.id);
      // attach the activities to each single routine
      routine.activities = activitiesToAdd;
    }
    return routinesToReturn;
  } catch (error) {
    console.error
    throw error;
  }
}




async function updateActivity({ id, ...fields}) {
  // console.log(id, "this is ID")
  // console.log(Object.keys(fields), 'this is fields')
  // console.log(Object.values(fields))
  const setString = Object.keys(fields)
  .map((key,idx)=>`"${key}"=$${idx + 1}`)
  .join(',');
  // console.log(setString, "this is SETSTRING")
  try {
    const {rows: [activities]} = await client.query(`
    UPDATE activities
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `,Object.values(fields))
    // console.log(activities, 'this is the activities')
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
