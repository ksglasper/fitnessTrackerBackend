const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
 

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    console.log('is it stopping here?????')
    // nothing to see here
    next();
    
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        console.log(" of course we made it")
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    console.log("we made it")
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});



// GET /api/health
router.get("/health", async (req, res, next) => {
  const message = "All is well, enjoy the 200!";
  res.send({ message });
  next();
});

// ROUTER: /api/users
const usersRouter = require("./users");
router.use("/users", usersRouter);

// ROUTER: /api/activities
const activitiesRouter = require("./activities");
router.use("/activities", activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require("./routines");
router.use("/routines", routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require("./routineActivities");
const { getUserByUsername, getUserById } = require("../db");
const { response } = require("../app");
router.use("/routine_activities", routineActivitiesRouter);

router.use((error, req, res, next) => {
  let errorStatus = 200
  if(error.status){
  errorStatus = error.status
  }
  console.log(res.status, "why isnt it working@@@@@@@@")
  res.status(errorStatus).send({
    message: error.message,
    name: error.name,
    error: error.error,
  });
});

module.exports = router
