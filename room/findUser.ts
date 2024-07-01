import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findRoomsByUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    type userdetails = {
      id: String;
      name: String;
      roomid: String;
      image: String;
      comment: String;
      time: String;
    };
    const arr: userdetails[] = [];
    if (!id) {
      res.status(400).json({ message: "id is required" });
      return;
    }
    const rooms = await prisma.roomUser.findMany({
      where: {
        userId: id,
      },
      select: {
        id: false,
        roomId: false,
        userId: false,
        room: {
          select: {
            name: true,
            id: true,
            lastOnline: true,
            image: true,
            remark: true,
            users: {
              select: {
                user: true,
              },
            },
          },
        },
      },
    });
    rooms.map((val) => {
      let user: userdetails = {
        id: "",
        name: "",
        roomid: val.room.id,
        image: "",
        comment: "",
        time: "",
      };
      if (val.room.users.length === 2) {
        const userid = val.room.users;
        if (id === userid[0].user.id) {
          user.id = userid[1].user.id;
          user.name = userid[1].user.name;
          user.image = userid[1].user.image;
          user.comment = userid[1].user.remark;
          user.time = userid[1].user.lastOnline;
        } else {
          user.id = userid[0].user.id;
          user.name = userid[0].user.name;
          user.image = userid[0].user.image;
          user.comment = userid[0].user.remark;
          user.time = userid[0].user.lastOnline;
        }
      } else {
        (user.id = val.room.id),
          (user.name = val.room.name),
          (user.image = val.room.image),
          (user.comment = val.room.remark),
          (user.time = val.room.lastOnline);
      }
      arr.push(user);
    });
    res.status(200).json(arr);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Internal Server Error" });
  }
};

export { findRoomsByUser };
