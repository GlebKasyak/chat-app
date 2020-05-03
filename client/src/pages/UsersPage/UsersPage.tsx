import React, { FC } from "react";
import { Row, Col } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import { ResponseType } from "../../typescript/common";
import { IUser } from "../../typescript/user";

import { UserCard, Preloader, EmptyComponent, Search } from "../../components";
import "./style.scss";


type PropsType = {
    users: Array<IUser>,
    onClick: (partnerId: string) => Promise<void>,
    setNextPage: () => void,
    hasMore: boolean,
    searchUserByEmail: (value: string, token: string, userId: string) => Promise<ResponseType>,
};

const UsersPage: FC<PropsType> = props => (
    <div className="container">
        <Row className="user-page-search" >
            <Col xs={18} md={14} >
                <Search
                    callback={ props.searchUserByEmail }
                    tooltip="search by email"
                />
            </Col>
        </Row>
        { props.users.length ? (
            <Row className="user-page" >
                <InfiniteScroll
                    next={ props.setNextPage }
                    hasMore={ props.hasMore }
                    loader={ <Preloader text="Loading..." modifier="bottom-scroll-loader" /> }
                    dataLength={ props.users.length }
                >
                   <div className="user-page__user-list">
                       { props.users.map((user: IUser) =>
                           <UserCard user={ user } key={ user._id } onClick={ props.onClick } /> )
                       }
                   </div>
                </InfiniteScroll>
            </Row>
        ) : (
            <EmptyComponent description="User list is empty" />)
        }
    </div>
);

export default UsersPage;
