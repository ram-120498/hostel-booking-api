import mongoose from 'mongoose'
//const { Schema } = mongoose;

const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },

    price:{
        type: Number,
        required: true
    },

    maxPeople:{
        type: Number,
        required: true,
    },
    
    description:{
        type: String,
        required: true,
    },

       
    roomNumber:[{
        number: Number,
        unavailableDates: {
            type: [Date]
        }
    }],

        photos:{
        type: [String],
    },
},

{timestamps: true}

)

export default mongoose.model("Room", RoomSchema)