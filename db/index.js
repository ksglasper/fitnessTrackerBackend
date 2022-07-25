module.exports = {
 const client = require("./client")
  // ...require('./client'), // adds key/values from users.js
const {
  createUser,
   getUser, 
   getUserById, 
   getUserByUsername} = require('./users'), // adds key/values from users.js

const {
  getAllActivities,
  createActivity, 
  getActivityById,
   getActivityByName,
    attachActivitiesToRoutines,
     updateActivity} = require('./activities'), // adds key/values from activites.js

const {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine} = require('./routines'), // etc
  
  const {
    getRoutineActivityById,
    addActivityToRoutine,
    getRoutineActivitiesByRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
    canEditRoutineActivity} = require('./routine_activities') // etc
}