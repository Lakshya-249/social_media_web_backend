import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sendMessage = async (req: Request, res: Response): Promise<void> => {
  const { userid, roomid, message } = req.body;
  try {
    const user = await prisma.roomUser.findFirst({
      where: {
        userId: userid,
        roomId: roomid,
      },
    });
    if (user === null) {
      res.status(404).json({ message: "User not found in the room" });
      return;
    }
    const newmessage = await prisma.message.create({
      data: {
        content: message as string,
        userId: userid as string,
        roomId: roomid as string,
      },
    });
    res.status(200).json({ data: newmessage, success: true });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.message.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ success: true });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// e23cd702-6194-47e5-9592-aba0e0f1fe39

export { sendMessage, deleteMessage };
