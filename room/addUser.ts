import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addUsertoRoom = async (req: Request, res: Response): Promise<void> => {
  const { userId, roomId } = req.body;
  try {
    if (!userId || !roomId) {
      res
        .status(400)
        .json({ message: "Bad Request; both userid and roomid required" });
      return;
    }
    const user = await prisma.roomUser.createMany({
      data: {
        userId: userId,
        roomId: roomId,
      },
    });
    res.status(201).json({ user, message: "User added to room successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const makePrivateRoom = async (req: Request, res: Response): Promise<void> => {
  const { user1, user2, name } = req.body;
  try {
    if (!user1 || !user2 || !name) {
      res.status(400).json({ message: "Bad Request; all fields required" });
      return;
    }
    const room = await prisma.room.create({
      data: {
        name: name,
        users: {
          createMany: {
            data: [
              {
                userId: user1,
              },
              {
                userId: user2,
              },
            ],
          },
        },
      },
    });
    res.status(201).json({ room, message: "Room created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addUserstoRoom = async (req: Request, res: Response): Promise<void> => {
  const { multiuser } = req.body;
  try {
    if (!multiuser) {
      res.status(400).json({ message: "Bad Request; all fields required" });
      return;
    }
    console.log(multiuser);

    const user = await prisma.roomUser.createManyAndReturn({
      data: multiuser,
      skipDuplicates: true,
    });
    res.status(201).json({ user, message: "Users added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User do not exist" });
  }
};

export { addUserstoRoom, makePrivateRoom };
