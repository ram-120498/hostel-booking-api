import User from "../models/User.js"

//CREATE export
//we already have register Function

//UPDATE export
export const updateUser = async(req, res, next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true});
    
        res.status(200).json(updatedUser)
    }catch(err){
        next(err);
    }
};

//DELETE export
export const deleteUser = async(req, res, next)=>{
    try{
        await User.findByIdAndDelete(
            req.params.id,
        );
        res.status(200).json("User has been deleted")
    }catch(err){
        next(err);
    }
};

//GET export
export const getUser = async(req, res, next)=>{

    try{
        const user = await User.findById(
            req.params.id,
            );           
        res.status(200).json(user)
    }catch(err){
        next(err);
    }
};

//GET ALL export
export const getUsers = async(req, res, next)=>{
    // const failed =true;
    //if (failed) return next(createError(401, "You are not authenticated!"));
    try{
        const users = await User.find(
            req.params.id,
            );
            
        res.status(200).json(users)
    }catch(err){
        next(err)
    }
};