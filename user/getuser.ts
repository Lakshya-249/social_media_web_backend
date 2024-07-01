import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.query;
  try {
    if (!name) {
      res.status(400).json({ message: "name is required" });
      return;
    }
    const users = await prisma.user.findMany({
      where: {
        name: { contains: name as string },
      },
      select: {
        name: true,
        image: true,
        id: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export { getAllUsers, getUsers };
