const {v4: uuid} = require('uuid');
const Workout = require('../database/workOut')

const getAllWorkouts = (filterParams) => {

    try{
      const allWorkouts = Workout.getAllWorkouts(filterParams);
    return allWorkouts;  
    }catch(error){
        throw error;
    }
    
}
const getOneWorkout = (workOutId) => {
    try{
        const workOut = Workout.getOneWorkout(workOutId);
        return workOut; 
    }catch(error){
        throw error;
    }
    
}
const createNewWorkout = (newWorkout) => {
    const workOutToInsert = {
        ...newWorkout,
        id:uuid(),
        createdAt: new Date().toLocaleDateString("en-Us", {timeZone:"UTC"}),
        updatedAt: new Date().toLocaleDateString("en-Us", {timeZone:"UTC"}),
    };

    try{
        const createdWorkout = Workout.createNewWorkout(workOutToInsert);
        return  createdWorkout;
    }catch (error){
        throw error;
    }

}
const updateOneWorkout = (workoutId,changes) => {
    try{
    const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
    }catch(error){
        throw error;
    }

}
const deleteOneWorkout = (workoutId) => {
    Workout.deleteOneWorkout(workoutId)
}

module.exports ={
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}