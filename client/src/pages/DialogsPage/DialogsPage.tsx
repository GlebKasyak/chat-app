import React, { FC } from "react";
import { Divider, List, Button } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import { DialogItem, Preloader, Search } from "../../components";

import { ResponseType } from "../../typescript/common";
import { IDialog } from "../../typescript/dialog";
import "./style.scss";

type PropsType = {
    dialogs:  Array<IDialog>,
    userId: string,
    onClick: (dialogId: string) => void,
    searchDialogs: (value: string, token: string, userId: string) => Promise<ResponseType>,
    setNextPage: () => void,
    hasMore: boolean,
    getAllDialogs: () => void
}

const DialogsPage: FC<PropsType> = props => (
    <div className="container dialog-page">
        <Search
            callback={ props.searchDialogs }
            tooltip="search by partner"
        />
        { !!props.dialogs.length && (
           <>
               <Divider orientation="left">Your dialogs</Divider>
               <InfiniteScroll
                   next={ props.setNextPage }
                   hasMore={ props.hasMore }
                   loader={ <Preloader text="Loading..." modifier="bottom-scroll-loader" /> }
                   dataLength={ props.dialogs.length }
               >
                   <List
                       className="dialog-page__list"
                       header={ <Button type="dashed" onClick={ props.getAllDialogs } >All dialogs</Button> }
                       footer={ <div>kasyak.production ©</div> }
                       bordered
                       dataSource={ props.dialogs }
                       renderItem={ dialog => {
                           const { _id, firstName, avatar } = dialog.partner;

                           const name = props.userId === _id ? dialog.author.firstName : firstName;
                           const img = props.userId === _id ? dialog.author.avatar : avatar;

                           return  (
                               <DialogItem
                                   name={ name }
                                   avatar={ img }
                                   lastMessage={ dialog.lastMessage }
                                   dialogId={ dialog._id }
                                   onClick={ props.onClick }
                               />
                           )
                       }}
                   />
               </InfiniteScroll>
           </>
        )}
    </div>
)

export default DialogsPage;