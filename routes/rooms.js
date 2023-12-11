import express from "express"
import { verifyAdmin } from "../utils/verifyTooken.js";
import { 
    updateRoom,
    createRoom,
    deleteRoom,
    getRoom,
    getRooms
} from "../controllers/room.js";

const router = express.Router();

//CREATE
router.post("/:hostelid", verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:id/:hostelid", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);
    
export default router