import React, { FC, UIEvent, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { BaseEmoji } from "emoji-mart";
import io from "socket.io-client";

import ChatPage from "./ChatPage";

import { ENV } from "../../assets/constants";
import { getDataFromQueryUrl } from "../../shared/helpres";
import { UserSelectors } from "../../store/selectors";
import { AppStateType } from "../../store/reducers";
import { dialogActions } from "../../store/actions/dialog.action";

import { Handlers } from "../../interfaces/common";
import { IUser } from "../../interfaces/user";
import { IMessage } from "../../interfaces/dialog";


const socket = io( ENV.SERVER_URL );

type MapStateToProps = {
    user: IUser
}

type MapDispatchToProps = {
    clearDialogList: () => void
}

type PropsType = MapStateToProps & MapDispatchToProps;

const ChatPageContainer: FC<PropsType> = ({ user, clearDialogList }) => {
    const history = useHistory();
    const chatRef = useRef<HTMLDivElement | null>(null);
    const limit = 20;

    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [typingMessage, setTypingMessage] = useState("");
    const [message, setMessage] = useState("");
    const [queryData, setQueryData] = useState({
        partner: "", dialogId: ""
    });
    const [messages, setMessages] = useState<Array<IMessage> | []>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if(page === 1) {
          const { id, partner } = getDataFromQueryUrl(history.location.search);
          setQueryData({ dialogId: id, partner });

          const data = { dialogId: id, page, limit };

          if(!!user.firstName) {
              socket.emit("join", data, (messages: Array<IMessage>) => {
                  setMessages(messages.reverse());
              });
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
        if(messages.length <= limit && chatRef.current) {
            chatRef.current.scrollBy(0, chatRef.current.scrollHeight);
            setPage(2);
        }
    }, [messages.length]);

    useEffect(() => {
        if(messages.length > limit && chatRef.current && !isLoading) {
            chatRef.current.scrollBy(0, chatRef.current.clientHeight);
        }
    }, [messages.length, isLoading, page]);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        if(page > 1 && e.currentTarget.scrollTop === 0 && hasMore) {
            setIsLoading(true);

            socket.emit("previous messages",
                { dialogId: queryData.dialogId, page, limit }, (messages: Array<IMessage>) => {
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
            socket.emit("create new message", { message, dialog: queryData.dialogId, author: user._id });
            setTypingMessage("");
            setMessage("");
            chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
        }
    }

    const handleChange: Handlers.ChangeType = ({ target }) => {
        setMessage(target.value);

        socket.emit("typing", {
            dialogId: queryData.dialogId,
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
        chatRef={ chatRef }
        isLoading={ isLoading }
        dialogName={ queryData.partner }
    />
}

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
    state => ({ user: UserSelectors.getUser(state) }),
    { clearDialogList: dialogActions.clearDialogListAC }
)(ChatPageContainer);