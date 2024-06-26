import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createRoom = async (req: Request, res: Response): Promise<void> => {
  const { name, userid } = req.query;
  try {
    if (!name || !userid) {
      res.status(400).json({ message: "all field are required but not given" });
      return;
    }
    const room = await prisma.room.create({
      data: {
        name: name as string,
        users: {
          create: {
            userId: userid as string,
          },
        },
      },
    });
    res.status(200).json(room);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createRoom };
