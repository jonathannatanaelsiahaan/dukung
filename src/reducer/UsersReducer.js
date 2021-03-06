/* GENERATED BY REDUX-GENERATOR */
import { TYPE } from "../action/UsersAction";

class UsersReducer {
  static elements(state, action = {}) {
    return ({
      ...state,
      ...action.value
    });
  }

  static reduce(state = {}, action = {}) {
    switch(action.type) {
      case TYPE:
        return UsersReducer.elements(state, action);
      default:
        return state;
    }
  }
}
export default UsersReducer;