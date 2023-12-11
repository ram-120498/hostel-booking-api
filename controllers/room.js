import Room from "../models/Room.js"
import Hostel from "../models/Hostel.js"
import { createError } from "../utils/error.js";


//CREATE ROOM EXPORT
export const createRoom = async (req, res, next) => {

    const hostelId = req.params.hostelid;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save();
        try{
            await Hostel.findByIdAndUpdate(
                hostelId, {
                $push: { rooms: savedRoom._id },
            });
            
            }catch(err){
                next(err);
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err);
}
};

//UPDATE ROOM export
export const updateRoom = async(req, res, next)=>{

    try{
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
            );
    
        res.status(200).json(updatedRoom)
    }catch(err){
        next(err);
    }
};

//DELETE ROOM export
export const deleteRoom = async(req, res, next)=>{
    const hostelId = req.params.hostelid;

    try{
        await Room.findByIdAndDelete(
            req.params.id,
        );
        try{
            await Hostel.findByIdAndUpdate(hostelId, {
                $pull: {rooms: req.params.id}
            });
            }catch(err){
                next(err);
        }
        res.status(200).json("Room has been deleted")
    }catch(err){
        next(err);
    }
};

//ROOOM AVAILABILITY
export const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };

//GET ROOM export
export const getRoom = async(req, res, next)=>{

    try{
        const room = await Room.findById(
            req.params.id,
            );
            
        res.status(200).json(room)
    }catch(err){
        next(err);
    }
};

//GET ALL ROOMS export
export const getRooms = async(req, res, next)=>{

    // const failed =true;
    //if (failed) return next(createError(401, "You are not authenticated!"));

    try{
        const rooms = await Room.find(
            req.params.id,
            );
            
        res.status(200).json(rooms)
    }catch(err){
        next(err);
    }
};


/* //CREATE ROOM EXPORT
export const createRoom = async (req, res, next) => {

    const hostelId = req.params.hostelid;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save();
        await Hostel.findByIdAndUpdate(hostelId, {
             $push: { rooms: savedRoom._id },
            });
            res.status(200).json(savedRoom);
    }catch(err){
        next(err);
}
}; */