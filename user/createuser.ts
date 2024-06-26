import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { id, name } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        id: id as string,
        name: name as string,
      },
    });
    res.status(201).json({ newUser, message: "User created successfully" });
    return;
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({ message: "id is required" });
      return;
    }
    const deletedUser = await prisma.user.delete({
      where: {
        id: id as string,
      },
    });
    res.status(200).json({ deletedUser, messege: "user deleted successfully" });
    return;
  } catch (err) {
    console.log(err);
  }
};

export { createUser, deleteUser };
