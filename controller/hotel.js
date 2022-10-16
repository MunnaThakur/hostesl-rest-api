import Hotel from "../models/hotel.js";

export const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const result = await newHotel.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSingleHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({ data: hotels });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
