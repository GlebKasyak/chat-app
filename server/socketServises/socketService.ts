import { Server } from "socket.io";

import messageSocketService from "./messageSocketService";

export default (io: Server) => {
    io.on("connection", socket => {
        try {
            messageSocketService(socket, io);
        } catch (err) {
            throw new Error(err);
        }

        socket.on("disconnect", () => {
            io.emit("disconnect");
            socket.disconnect(true);
        })
    });
}