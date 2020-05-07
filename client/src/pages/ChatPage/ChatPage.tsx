import React, { FC, RefObject } from "react";
import { Picker, BaseEmoji } from "emoji-mart";
import { Button, Col, Form, Icon, Input, Row, Typography } from "antd";

import { Messages, TypingMessage, Preloader } from "../../components";

import { IMessage } from "../../interfaces/dialog";
import { SetStateType, Handlers } from "../../interfaces/common";
import "./style.scss";

type PropsType = {
    message: string,
    onSubmit: Handlers.SubmitType,
    onChange: Handlers.ChangeType,
    onEmojiPicker: (emoji: BaseEmoji) => void
    messages: Array<IMessage>,
    userId: string,
    emojiPickerVisible: boolean,
    openEmoji: SetStateType<boolean>,
    isTyping: boolean,
    typingMessage: string,
    onScroll: (e: any) => void,
    chatRef: RefObject<HTMLDivElement>,
    isLoading: boolean,
    dialogName: string
}

const ChatPage: FC<PropsType> = props => (
    <div className="container" >
        <div className="chat-page">
            <Typography.Title level={2} className="center chat-page_title">
                { props.dialogName }
            </Typography.Title>

            <Row className="chat-page__window" >
                <div>
                    sdfsdf
                </div>
                <div className="infinite-container" ref={ props.chatRef  } onScroll={ props.onScroll } >
                    { !!props.messages.length &&
                    <>
                        { props.isLoading &&
                            <Preloader text="Messages are loading" modifier="top-scroll-loader" />
                        }
                        <Messages
                            messages={ props.messages }
                            userId={ props.userId }
                        />
                    </>
                    }
                </div>
            </Row>
            <Form layout="inline" className="chat-page__form"  onSubmit={ props.onSubmit }  >
                <TypingMessage
                    message={ props.typingMessage }
                    isTyping={ props.isTyping }
                />
                <Col xs={14} md={14} >
                    <Button
                        onClick={ props.openEmoji.bind(null, !props.emojiPickerVisible) }
                        icon="smile"
                        type="link"
                        className="chat-page__smile-btn"
                    />
                    <Input
                        prefix={ <Icon type="message" style={{ color: "rgba(0,0,0, .25)" }} /> }
                        placeholder="Input your message"
                        value={ props.message }
                        onChange={ props.onChange }
                    />
                </Col>
                { props.emojiPickerVisible &&
                <div className="chat-page__emoji-picker">
                    <Picker set="apple" onSelect={ props.onEmojiPicker } />
                </div>
                }
                <Col md={6} xs={14}  >
                    <Button type="primary" className="w-100 btn" htmlType="submit" >
                        <Icon type="enter" /> Enter
                    </Button>
                </Col>
            </Form>
        </div>
    </div>
)

export default ChatPage;