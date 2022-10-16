import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  photos: {
    type: [String],
  },
  distance: {
    type: String,
  },
  cheapestPrice: {
    type: Number,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Hotel", hotelSchema);
