import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response): Promise<Response>{
    const {userId} = req;

    try{
        const booking = await bookingService.getBooking(Number(userId));

        return res.status(httpStatus.OK).send(booking);
    }catch (err){

        if(err.name === "NotFoundError"){
            return res.sendStatus(httpStatus.NOT_FOUND);
        }

        return res.sendStatus(httpStatus.FORBIDDEN);

    }

    
}

export async function createBooking(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { userId } = req;
    const { roomId } = req.body;
  
    try {
  
      const booking = await bookingService.createBooking(userId, Number(roomId))
      return res.status(httpStatus.OK).send(booking)
    } catch (error) {
     
      if (error.name === "NotFoundError") {
        return res.sendStatus(httpStatus.NOT_FOUND)
      }
      if (error.name === "FORBIDDEN") {
        return res.sendStatus(httpStatus.FORBIDDEN)
      }
    }
  }
  
export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;

  try{
    const updateBooking = await bookingService.updateBooking(Number(userId), Number(roomId), Number(bookingId));
    return res.status(httpStatus.OK).send(updateBooking);
  }catch(error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "forbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}