import express from "express"
import { verifyAdmin } from "../utils/verifyTooken.js";
import { 
    updateHostel,
    createHostel,
    deleteHostel,
    getHostel,
    getHostels,
    countByCity,
    countByType,
    countByAddress
} from "../controllers/hostel.js";


const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHostel);

//UPDATE
router.put("/:id", verifyAdmin, updateHostel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHostel);

//GET
router.get("/find/:id", getHostel);

//GET ALL
router.get("/", getHostels);
router.get("/countByType", countByType);
router.get("/countByCity", countByCity);
router.get("/countByAddress", countByAddress);
    
export default router