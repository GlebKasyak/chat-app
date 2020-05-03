import { Schema, model, Types } from "mongoose";
import { NextFunction } from "express";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import Dialog from "./dialogModel";
import Message from "./messageModel";
import { IUserDocument, IUserModel } from "../interfaces/UserInterface";

const userSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    secondName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        min: 4,
        trim: true
    },
    avatar: {
        type: String,
        default: "uploads/default/default_avatar.png"
    },
    dialogs: [{ type: Types.ObjectId, ref: "Dialog" }]

}, {
    timestamps: true
});

userSchema.pre<IUserDocument>("save", async function(next: NextFunction) {
    const user = this;

    if(user.isModified("password")) { user.password = await hash(user.password, 15) }
    next();
});


userSchema.post("remove", async function(user: IUserDocument) {
    await Dialog.deleteMany({ _id: { $in: user.dialogs } });
    await Message.deleteMany({ $or: [{ author: user._id }, { partner: user._id }] });
});

userSchema.statics.findByCredentials = async (email: string, password: string): Promise<IUserDocument> => {
    const user = await User.findOne({ email }) as IUserDocument;
    if(!user) throw new Error("Incorrect data during sign in system");

    const isMatch: boolean = await compare(password, user.password);
    if(!isMatch) {
        throw new Error("Password is incorrect, please try again");
    }

    return user;
};

userSchema.methods.generateAuthToken = async function(): Promise<string> {
    const user = this as IUserDocument;
    return sign({ userId: user._id }, "secret");
};


const User: IUserModel = model<IUserDocument, IUserModel>("User", userSchema);
export default User;
