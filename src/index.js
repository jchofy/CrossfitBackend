const express = require("express");
const cors = require('cors');
const Workout1Router = require("./v1/routes/workoutRoutes");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use("/api/v1/workouts",Workout1Router);

app.listen(PORT, ()=>{
    console.log(`API is listening in PORT: ${PORT}`)
})