import { Socket, Server } from "socket.io";
import { MessagesPortionType } from "../interfaces/DialogInterface";
import { Callback } from "../interfaces";
import { IMessageDocument } from "../interfaces/MessageInterface";
import { DialogService, MessageService } from "../services";

export default (socket: Socket, io: Server) => {
    onJoin(socket);
    getPrevMessages(socket);
    onTyping(socket);
    createNewMessage(socket, io);
}

const onJoin = (socket: Socket) => {
    socket.on("join", async (data: MessagesPortionType, callback: Callback<Array<IMessageDocument>>) => {
        const dialog = await DialogService.getDialogWithMessages(data);

        callback(dialog.messages as Array<IMessageDocument>);
        socket.join(data.dialogId);
    });
};

const getPrevMessages = (socket: Socket) => {
    socket.on("previous messages", async (data: MessagesPortionType, callback: Callback<Array<IMessageDocument>>) => {
        const dialog = await DialogService.getDialogWithMessages(data);

        callback(dialog.messages as Array<IMessageDocument>);
    });
};

const onTyping = (socket: Socket) => {
    type DataType = {
        typingMessage: string,
        isTyping: boolean,
        dialogId: string
    }

    socket.on("typing",  (data: DataType) => {
        const { typingMessage, dialogId, isTyping } = data;

        socket.broadcast.to(dialogId).emit("typing", { typingMessage, isTyping });
    });
};

const createNewMessage = (socket: Socket, io: Server) => {
    socket.on("create new message", async (data: IMessageDocument) => {
        const message = await MessageService.createMessage(data);

        io.to(data.dialog).emit("message", message);
    });
};

