import { Router } from "express";
import { createUser, deleteUser } from "./user/createuser";
import { deleteMessage, sendMessage } from "./Message/message";
import { createRoom } from "./room/createroom";
import { addUserstoRoom } from "./room/addUser";

const router = Router();

router.post("/createuser", createUser);
router.post("/sendmessage", sendMessage);
router.post("/createroom", createRoom);
router.post("/addusertoroom", addUserstoRoom);

router.delete("/deleteuser/:id", deleteUser);
router.delete("/deleteroom/:id", deleteMessage);

export default router;
