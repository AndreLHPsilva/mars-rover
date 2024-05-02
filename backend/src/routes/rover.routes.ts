import SendRoverController from "@controllers/sendRover/sendRover.controller";
import express from "express";

export const routerRover = express.Router();
const sendRoverController = new SendRoverController();

routerRover.post("/send", async (req, res) => {
  await sendRoverController.handler(req, res);
});
