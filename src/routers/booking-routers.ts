import { authenticateToken } from "@/middlewares";
import { Router } from "express";
import { createBooking, updateBooking, getBooking } from "@/controllers/booking-controllers";

const bookingRouter = Router();

bookingRouter
    .all("/*", authenticateToken)
    .get("/", getBooking)
    .post("/", createBooking)
    .put("/:bookingId", updateBooking);

export {bookingRouter};