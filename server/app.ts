import express, { json, Application } from "express";
import path from "path";
import cors from "cors";
import { createServer } from "http";
import socketIo from "socket.io"
import cookieParser from "cookie-parser";
import dotenvExtended from "dotenv-extended";

import { MessageService, DialogService } from "./services";
import { IMessageDocument } from "./interfaces/MessageInterface";
import { MessagesPortionType, IDialogDocument } from "./interfaces/DialogInterface";
import { Callback } from "./interfaces";

import connectToDb from "./db";
import config from "./config";
import rootRouter from "./routes";


dotenvExtended.load();
connectToDb();

const app: Application = express();
app.use(json());
app.use(cors());
app.use(cookieParser());

rootRouter(app);

const server = createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
    try {
        socket.on("join", async (data: MessagesPortionType, callback: Callback<Array<IMessageDocument>>) => {
            const dialog = await DialogService.getDialogWithMessages(data);

            callback(dialog.messages as Array<IMessageDocument>);
            socket.join(data.dialogId);
        });

        socket.on("previous messages", async (data: MessagesPortionType, callback: Callback<Array<IMessageDocument>>) => {
            const dialog = await DialogService.getDialogWithMessages(data);

            callback(dialog.messages as Array<IMessageDocument>);
        });

        socket.on("typing",  (data) => {
            const { typingMessage, dialogId, isTyping } = data;

            socket.broadcast.to(dialogId).emit("typing", { typingMessage, isTyping });
        });

        socket.on("create new message", async (data: IMessageDocument) => {
            const message = await MessageService.createMessage(data);

            io.to(data.dialog).emit("message", message);
        });

    } catch (err) {
        throw new Error(err);
    }

    socket.on("disconnect", () => {
        io.emit("disconnect");
        socket.disconnect(true);
    })
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if(config.IS_PRODUCTION) {
    app.use(express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req: express.Request, res: express.Response) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
    })
}

server.listen(config.PORT, () => {
    console.log(`Server up on ${ config.PORT }`)
});