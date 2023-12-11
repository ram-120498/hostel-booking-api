import Hostel from "../models/Hostel.js";
import Room from "../models/Room.js";

//CREATE export
export const createHostel = async(req, res, next)=>{

    const newHostel =new Hostel(req.body)
try{
    const savedHostel = await newHostel.save()
    res.status(200).json(savedHostel)
}catch(err){
    next(err);
}
};

//UPDATE export
export const updateHostel = async(req, res, next)=>{

    try{
        const updatedHostel = await Hostel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true});
    
        res.status(200).json(updatedHostel)
    }catch(err){
        next(err);
    }
};

//DELETE export
export const deleteHostel = async(req, res, next)=>{

    try{
        await Hostel.findByIdAndDelete(
            req.params.id,
        );
        res.status(200).json("Hostel has been deleted")
    }catch(err){
        next(err);
    }
};

//GET export
export const getHostel = async(req, res, next)=>{

    try{
        const hostel = await Hostel.findById(
            req.params.id,
            );
            
        res.status(200).json(hostel)
    }catch(err){
        next(err);
    }
};

//GET ALL export
export const getHostels = async(req, res, next)=>{

    const { min, max, ...others } = req.query;
    try{
        const hostels = await Hostel.find({
            ...others, 
            cheapestPrice:{ $gt: min | 200000, $lt: max || 2000000 },
        }).limit(req.query.limit);
        res.status(200).json(hostels);
    }catch(err){
        next(err);
    }
};

//COUNT BY CITY
export const countByCity = async(req, res, next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hostel.countDocuments({city: city})
        }))
        res.status(200).json(list);
    }catch(err){
        next(err);
    }
};

//COUNT BY ADDRESS
export const countByAddress = async(req, res, next)=>{
    const addresses = req.query.addresses.split(",")
    try{
        const list = await Promise.all(addresses.map(address=>{
            return Hostel.countDocuments({address: address})
        }))
        res.status(200).json(list)
    }catch(err){
        next(err);
    }
};

//COUNT BY TYPE
export const countByType = async (req, res, next)=>{
    
    try{
        const hostelCount = await Hostel.countDocuments({type:"Hostel"})
        const apartmentCount = await Hostel.countDocuments({type:"Apartment"})
        const rentalCount = await Hostel.countDocuments({type:"Rental"})
            
        res.status(200).json([
            {type: "Hostel", count:hostelCount},
            {type: "Apartment", count:apartmentCount},
            {type: "Rental", count:rentalCount},
        ]);
    }catch(err){
        next(err);
    }
};

//COUNT BY HOSTEL ROOM
export const getHostelRooms = async (req, res, next) => {
    try {
      const hostel = await Hostel.findById(req.params.id);
      const list = await Promise.all(
        hostel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };