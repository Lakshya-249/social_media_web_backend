import { Router } from "express";
import { createUser, deleteUser } from "./user/createuser";
import { deleteMessage, sendMessage } from "./Message/message";
import { createRoom } from "./room/createroom";
import { addUserstoRoom, createGroup, makePrivateRoom } from "./room/addUser";
import { findRoomsByUser } from "./room/findUser";
import { getMessages } from "./Message/getmessage";
import { getAllUsers, getUsers } from "./user/getuser";

const router = Router();

router.get("/getroomsfromUser/:id", findRoomsByUser);
router.get("/getmessages", getMessages);
router.get("/getusers", getUsers);
router.get("/getallusers", getAllUsers);

router.post("/createuser", createUser);
router.post("/sendmessage", sendMessage);
router.post("/createroom", createRoom);
router.post("/addusertoroom", addUserstoRoom);
router.post("/creategroup", createGroup);
router.post("/createprivateroom", makePrivateRoom);

router.delete("/deleteuser/:id", deleteUser);
router.delete("/deletemessage/:id", deleteMessage);

export default router;
