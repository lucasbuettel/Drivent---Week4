import { forbiddenError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBooking(userId:number) {
    const booking = await bookingRepository.searchBooking(userId);
        if(!booking){
            throw {name: "NotFoundError", message: "No booking"}
        }
        return {bookingId: booking.id, Room: booking.Room};
}


async function createBooking(userId: number, roomId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
      throw notFoundError();
    }
  
    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    if(!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
      throw {name: "FORBIDDEN"};
    }
  
    const room = await bookingRepository.findRoom(roomId);
    if(!room) {
      throw notFoundError();
    }
    
    if(room.capacity === 0) {
      throw {name: "FORBIDDEN"};
    }
  
    const createdBooking = await bookingRepository.createBooking(userId, roomId);
    return { bookingId: createdBooking.roomId };
  }
  
  async function updateBooking(userId: number, roomId: number, bookingId: number) {
    const room = await bookingRepository.findRoom(roomId);
    if(!room) {
      throw notFoundError();
    }
  
    if(room.capacity === 0) {
      throw forbiddenError();
    }
  
    const booking = await bookingRepository.searchBooking(userId);
    if(!booking) {
      throw forbiddenError();
    }
  
    const updateBooking = await bookingRepository.updateBooking(roomId, bookingId);
    return { bookingId: updateBooking.id };
  }
const bookingService = {
    getBooking,
    createBooking,
    updateBooking
}

export default bookingService;