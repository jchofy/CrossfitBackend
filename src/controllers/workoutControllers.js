const workOutService = require('../services/workOutService')

const getAllWorkouts = (req, res) =>{
    const {mode} = req.query;
    const {limit} = req.query;
    try{

        const allWorkouts = workOutService.getAllWorkouts({mode,limit});
        res.send({status: 'Ok', data: allWorkouts});
    }catch(error){
            res
        .status(error?.status || 500)
        .send({status: "Failed", data:{error:error?.message || error}});
    }

}

const getOneWorkout = (req, res) =>{
    const {
        params: {workoutId},
    } = req;
    if(!workoutId){
        res
        .status(400)
        .send({
            status:"Failed",
            data:{error:"Parameter ':workoutId' can not be empty"}
        });
    
     try{
            const workout = workOutService.getOneWorkout(workoutId);
            res.send({status: "Ok",data:workout});
     }catch(error){
        res
        .status(error?.status || 500)
        .send({status: "Failed",data: {error:error?.message || error}});
     }
    }
    
}

const createNewWorkouts = (req, res) =>{
    const {body} = req;
    if(
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips

    ) {
        res.status(400).send({
            status: "Failed",
            data:{
                error:
                "Error 400 One of the keys is missing or is empty"
            }
        });
        return
    }

    const newWorkout = {
      name: body.name,
      mode: body.mode,
      equipement: body.equipement,
      exercices: body.exercices,
      trainerTips: body.trainerTips
    };

    try{
        const createdWorkout = workOutService.createNewWorkout(newWorkout);
        res.status(201).send({status:"Ok", data: createNewWorkouts})
    }catch(error){
        res
        .status(error?.status || 500)
        .send({status:"Failed", data: {error:error?.message || error}})
    }

    const createWorkout = workOutService.createNewWorkout(newWorkout);
    res.status(201).send({status:'OK',data: createWorkout})

}

const updateOneWorkouts = (req, res) =>{
    const {
        body,
        params:{ workoutId},
    } = req;

    if(!workoutId){
        res
        .status(400)
        .send({
            status:"Failed",
            data:{error:"Parameter 'Workout:id' can not be wmpty"}
        })
        return;
    }

    try{
        const updatedWorkout = workOutService.updateOneWorkout(workoutId,body);
        res.send({status:"Ok",data:updatedWorkout});
    }catch(error){
        res
        .status(error?.status || 500)
        .send({status:"Failed", data: {error: error?.message || error}})
    }
    
}

const deleteOneWorkouts = (req, res) =>{
    const {
        params: {workoutId},
    } = req;
    
    if(!workoutId){
        res
        .status(400)
        .send({
            status:"Failed",
            data:{error:"Parameter ':workoutId' can not be empty"}
        });
    }

    try{
        workOutService.deleteOneWorkout(workoutId);
        res.status(204).send({status:"OK"});
    }catch(error){
        res.status(error?.status || 500)
        .send({status:"Failed",data:{error:error?.message || error}})
    }
  
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkouts,
    updateOneWorkouts,
    deleteOneWorkouts
}