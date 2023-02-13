import { prisma } from "@/config";

async function searchBooking(userId: number) {
    return prisma.booking.findFirst({
        where: {
             userId
        },
        select: {
          Room: true,
          id: true,
        }
    });
  }

  async function findRoom(roomId: number) {
    return prisma.room.findUnique({
      where: {id:roomId}
    })
  }

  async function createBooking(userId: number, roomId: number) {
    return prisma.booking.create({
        data:{
          userId,
          roomId
        }, select:{
          roomId: true
        }
    })
  }
  
  async function checkCapacity(roomId: number) {
    return prisma.booking.findMany({
      where: {
        roomId
      }
    })
  }

  async function updateBooking(roomId: number, bookingId: number) {
    return prisma.booking.update({
      where: {
        id: bookingId
      },
      data: {
        roomId: roomId
      }
    });
  }

  const bookingRepository = {
    searchBooking,
    findRoom,
    createBooking,
    checkCapacity,
    updateBooking
  }

  export default bookingRepository;