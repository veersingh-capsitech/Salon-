import Booking from "../models/bookingModel.js";

export const getBookings = async (req, res) => {
  try {
    const { salonId } = req.query;
    if (!salonId) {
      return res.status(400).json({ message: "Salon ID is required" });
    }
    const bookings = await Booking.find({ salonId })
      .populate("employeeId")
      .populate("serviceId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};