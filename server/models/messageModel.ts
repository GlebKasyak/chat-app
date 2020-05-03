import { Schema, model, Model, Types } from "mongoose";

import { IMessageDocument } from "../interfaces/MessageInterface";
import Dialog from "./dialogModel";
import User from "./userModel";

const messageSchema: Schema = new Schema({
    message: {
       type: String,
       trim: true,
   },
    author: {
       type: Types.ObjectId,
        ref: "User"
    },
    dialog: {
        type: Types.ObjectId,
        ref: "Dialog"
    }
}, {
    timestamps: true
});

messageSchema.methods.updateDialog = async function(name: string, avatar: string): Promise<void> {
    const message = this as IMessageDocument;

    const update = {
        $push: { messages: message._id },
        $set: { lastMessage: { message: message.message, name, avatar } }
    };
    await Dialog.update({ _id: message.dialog }, update);
}

export default model<IMessageDocument, Model<IMessageDocument>>("Message", messageSchema);