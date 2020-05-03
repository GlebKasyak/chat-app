import React, { FC, UIEvent, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { BaseEmoji } from "emoji-mart";
import io from "socket.io-client";

import { SERVER_URL } from "../../shared/constants";
import { getDataFromQueryUrl } from "../../shared/helpres";
import { AppStateType } from "../../store/reducers";
import { dialogActions } from "../../store/actions/dialog.action";

import { Handlers } from "../../typescript/common";
import { IUser } from "../../typescript/user";
import { IMessage } from "../../typescript/dialog";

import ChatPage from "./ChatPage";

const socket = io( SERVER_URL );

type MapStateToProps = {
    user: IUser
}

type MapDispatchToProps = {
    clearDialogList: () => void
}

type PropsType = MapStateToProps & MapDispatchToProps;

const ChatPageContainer: FC<PropsType> = ({ user, clearDialogList }) => {
    const history = useHistory();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const limit = 10;

    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [typingMessage, setTypingMessage] = useState("");
    const [message, setMessage] = useState("");
    const [dialogId, setDialogId] = useState("");
    const [messages, setMessages] = useState<Array<IMessage> | []>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if(page === 1) {
          const { id } = getDataFromQueryUrl(history.location.search);
          setDialogId(id);

          const data = { dialogId: id, page, limit };

          if(!!user.firstName) {
              socket.emit("join", data, (messages: Array<IMessage>) => {
                  setMessages(messages.reverse());
              });

              setPage(2);
          }
        }

        return () => {
            socket.emit("disconnect");
            socket.off("join");
        }

    }, [history.location.search, user.firstName, page]);

    useEffect(() => {
        socket.on("message", (message: IMessage) => {
            setMessages((messages) => [...messages, message]);
            setIsTyping(false);
            setShowEmojiPicker(false);
        });

        type TypingDataType = {
            typingMessage: string,
            isTyping: boolean
        }

        socket.on("typing", ({ typingMessage, isTyping }: TypingDataType) => {
            setTypingMessage(typingMessage);
            setIsTyping(isTyping);
        });

        clearDialogList();

        return () => {
            socket.off("typing");
            socket.off("message");
        };
    }, [clearDialogList]);

    useEffect(() => {
        if(messagesEndRef.current) {
            if(messages.length === limit) {
                messagesEndRef.current.scrollBy(0, messagesEndRef.current.scrollHeight);
            } else {
                !isLoading && messagesEndRef.current.scrollBy(0, messagesEndRef.current.clientHeight);
            }
        }
    }, [messages.length, isLoading]);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        if(page > 1 && e.currentTarget.scrollTop === 0 && hasMore) {
            setIsLoading(true);

            socket.emit("previous messages", { dialogId, page, limit }, (messages: Array<IMessage>) => {
                setMessages(prevState => [...messages.reverse(), ...prevState]);

                setPage(prevPage => prevPage + 1);
                messages.length < limit && setHasMore(false);
                setIsLoading(false);
            });
        }
    }

    const handleSubmit: Handlers.SubmitType = (e) => {
        e.preventDefault();

        if(!!message) {
            socket.emit("create new message", { message, dialog: dialogId, author: user._id });
            setTypingMessage("");
            setMessage("");
        }
    }

    const handleChange: Handlers.ChangeType = ({ target }) => {
        setMessage(target.value);

        socket.emit("typing", {
            dialogId,
            typingMessage: `${ user.firstName } is typing`,
            isTyping: !!target.value
        });
    }

    const handleEmojiPicker = (emoji: BaseEmoji) => setMessage(message + emoji.native);

    return <ChatPage
        message={ message }
        onSubmit={ handleSubmit }
        onChange={ handleChange }
        onEmojiPicker={ handleEmojiPicker }
        messages={ messages }
        userId={ user._id }
        emojiPickerVisible={ emojiPickerVisible }
        openEmoji={ setShowEmojiPicker }
        isTyping={ isTyping }
        typingMessage={ typingMessage }
        onScroll={ handleScroll }
        messagesEndRef={ messagesEndRef }
        isLoading={ isLoading }
    />
}

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
    ({ user }) => ({ user: user.user }),
    { clearDialogList: dialogActions.clearDialogListAC }
)(ChatPageContainer);