import { Schema, model, Types, Model } from "mongoose";
import { NextFunction } from "express";

import User from "./userModel";
import Message from "./messageModel"
import { IDialogDocument } from "../interfaces/DialogInterface";

const dialogSchema: Schema = new Schema({
    author: { type: Types.ObjectId, ref: "User" },
    partner: { type: Types.ObjectId, ref: "User" },
    messages: [{ type: Types.ObjectId, ref: "Message" }],
    lastMessage: {
        message: {
            type: String,
            required: true,
            trim: true,
            default: "Dialog is empty"
        },
        avatar: {
            type: String,
            default: "uploads/default/default_avatar.png"
        },
        name: {
            type: String,
            default: "Admin"
        }
    }
}, {
    timestamps: true
});

dialogSchema.pre<IDialogDocument>("save", async function(next: NextFunction) {
    const dialog = this;

    await User.updateMany(
        { _id: { $in: [dialog.author, dialog.partner] } },
        { $push: { dialogs: dialog._id } });

    next();
});

dialogSchema.post("remove", async function(dialog: IDialogDocument): Promise<void> {
    await User.updateMany({}, { $pull: { dialogs: dialog._id } } );
    await Message.deleteMany({ dialog: dialog._id });
});

export default model<IDialogDocument, Model<IDialogDocument>>("Dialog", dialogSchema);