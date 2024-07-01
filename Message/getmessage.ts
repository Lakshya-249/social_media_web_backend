import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMessages = async (req: Request, res: Response): Promise<void> => {
  const { roomid } = req.query;
  try {
    if (!roomid) {
      res.status(400).json({ message: "Bad Request; roomid required" });
      return;
    }
    const messages = await prisma.message.findMany({
      where: {
        roomId: roomid as string,
      },
      select: {
        content: true,
        id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getMessages };
