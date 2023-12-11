import express from "express"
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers
} from "../controllers/user.js"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyTooken.js";

const router = express.Router();

/* router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("Login Successful")
})

router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
    res.send("Hello user, You're logged and you can DELETE YOUR ACCOUNTl")
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
    res.send("Hello ADMIN, You're logged and you can DELETE YOUR ACCOUNTl")
}) */

//UPDATE
router.put("/:id", verifyUser,updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);
    
export default router