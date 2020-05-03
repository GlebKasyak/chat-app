import { Message } from "../models";
import { IMessageDocument, IMessageWithAuthorData } from "../interfaces/MessageInterface";

export default class MessageService {
    constructor() {}

    static createMessage = async (data: IMessageDocument): Promise<IMessageWithAuthorData> => {
       const message = await Message.create(data);
       if (!message) throw new Error("Error with create message");

       const messageWithAuthorData = await message.populate("author").execPopulate() as IMessageWithAuthorData;
       const { firstName, avatar } = messageWithAuthorData.author;
       await message.updateDialog(firstName, avatar);

       return messageWithAuthorData;
    }
}

