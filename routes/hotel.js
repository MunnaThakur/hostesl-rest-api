import express from "express";
const router = express.Router();
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getSingleHotel,
  getAllHotels,
} from "../controller/hotel.js";
router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getSingleHotel);
router.get("/", getAllHotels);
export default router;
