const DB = require('./db.json');
const utils = require('./utils');

const getAllWorkouts = (filterParams) =>{
    try{
        let workouts = DB.workouts;

        if(filterParams.mode){
            return DB.workouts.filter((workout) => workout.mode.toLowerCase().includes(filterParams.mode));
        }

        if(filterParams.limit){
            return DB.workouts.slice(0,filterParams.limit)
        }
        return workouts;
    }catch(error){
        throw{status:500, message:error}
    }
   
}

const getOneWorkout = (workOutId) =>{
    try{
    const workOut = DB.workouts.find((workOut)=> workOut.id == workOutId);
    if(!workOut){
        throw{
            status:400,
            message: `Cant't find workout with the id ${workOutId}`
        };
    }
    return workOut;
    }catch(error){
        throw {status: error?.status || 500, message: error?.message || error}
    }
}

const updateOneWorkout = (workoutId,changes) =>{

    try{
        const isAlreadyAdded = 
        DB.workouts.findIndex((workOut) => workOut.name === changes.name)

        if(isAlreadyAdded){
            throw{
                status:400,
                message:`Workout whith the name ${changes.name} alreagy exists`
            };
        }

        const indexForUpdate = DB.workouts.findIndex((workout => workout.id == workoutId));
            if(indexForUpdate==-1){
                throw{
                    status:400,
                    message:`Can't find workout with the id ${workoutId} alreagy exists`
                };
            }
        const updatedWorkout = {
                ...DB.workouts[indexForUpdate],
                ...changes,
                updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
            };
        DB.workouts[indexForUpdate] = updatedWorkout;
            utils.saveToDatabase(DB);
            return updatedWorkout;    
    }catch(error){
        throw{ status: error?.status || 500, message: error?.message || error}
    }
    

    
    

    
}

const createNewWorkout = (workOutToInsert) =>{
    let encontrado = false;

    DB.workouts.forEach(workout => {
        if(workout.name == workOutToInsert.name){
           encontrado = true;
        }
    })

    if(encontrado){
        throw{
            status:400,
            message: `Workout with the name "${workOutToInsert.name}" is taken`
        }
    }

    try{
        DB.workouts.push(workOutToInsert);
        utils.saveToDatabase(DB);
        return workOutToInsert;
    }catch (error){
        throw { status:500, message: error?.message || error}
    }
}

const deleteOneWorkout = (workoutId) =>{
    try{
    const indexForDeletion = DB.workouts.findIndex(
        (workout) => workout.id == workoutId);

    if(indexForDeletion === -1){
       throw{
        status:400,
        message: `Can't find workout with the id '${workoutId}'`
       }
    }
    DB.workouts.splice(indexForDeletion,1);
    utils.saveToDatabase(DB);
    }catch(error){
        throw {status:error?.status || 500, message: error?.message || error}
    }
    

}

module.exports = {getAllWorkouts, createNewWorkout,getOneWorkout,updateOneWorkout,deleteOneWorkout}