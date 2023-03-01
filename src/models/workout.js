const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required :true
    },
    descripcion:{
        type:String,
        required :true
    },
    equipamiento:{
        type:Array,
        required :true
    },
    categoria:{
        type:String,
        required :true
    }
    

})

module.exports = mongoose.model('workouts',WorkoutSchema)