import React, { FC } from "react";
import { Row, Col } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import { UserCard, Preloader, EmptyComponent, Search } from "../../components";
import "./style.scss";

import { ResponseType } from "../../interfaces/common";
import { IUser } from "../../interfaces/user";


type PropsType = {
    users: Array<IUser>,
    onClick: (partnerId: string) => Promise<void>,
    setNextPage: () => void,
    hasMore: boolean,
    searchUserByEmail: (value: string, userId: string) => Promise<ResponseType>,
    page: number,
};

const UsersPage: FC<PropsType> = ({ users, ...props }) =>  (
    <div className="container">
        <Row className="user-page-search" >
            <Col xs={18} md={14} >
                <Search
                    callback={ props.searchUserByEmail }
                    tooltip="search by email"
                    placeholder="User search by email"
                />
            </Col>
        </Row>
        { users.length ? (
            <Row className="user-page" >
                <InfiniteScroll
                    next={ props.setNextPage }
                    hasMore={ props.hasMore }
                    loader={ props.page !== 2 && <Preloader text="Loading..." modifier="bottom-scroll-loader" /> }
                    dataLength={ users.length }
                >
                    <div className="user-page__user-list">
                        { users.map((user: IUser) =>
                            <UserCard user={ user } key={ user._id } onClick={ props.onClick } /> )
                        }
                    </div>
                </InfiniteScroll>
            </Row>
        ) : (
            <EmptyComponent description="User list is empty" />)
        }
    </div>
)

export default UsersPage;
