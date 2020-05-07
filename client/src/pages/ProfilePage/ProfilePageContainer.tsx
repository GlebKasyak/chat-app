import { connect } from "react-redux";

import ProfilePage from "./ProfilePage";

import { UserSelectors } from "../../store/selectors";
import { AppStateType } from "../../store/reducers";
import { IUser } from "../../interfaces/user";
import { removeUser } from "../../store/actions/user.action";


type MapStateToProps = {
  user: IUser
}

type MapDispatchToProps = {
  removeUser: () => void
}

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
    state => ({  user: UserSelectors.getUser(state) }),
    { removeUser }
)(ProfilePage);