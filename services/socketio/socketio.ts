import { Request } from "express";
import { Socket } from "socket.io";

export const emitEvent = (
  req: Request<unknown>,
  eventName: string,
  data?: Object
) => {
  const socket: Socket = req.app.get("socket");

  socket.emit(eventName, data);
};

export const emitBroadcastEvent = (
  req: Request<unknown>,
  eventName: string,
  data?: Object
) => {
  const socket: Socket = req.app.get("socket");

  socket.broadcast.emit(eventName, data);
};
