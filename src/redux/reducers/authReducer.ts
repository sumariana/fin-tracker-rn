import { UserModel } from "../../models/auth/Auth";
import { _users } from "../../models/dummy/_dummy";

export type AuthState = {
  isAuthenticated: boolean;
  users: UserModel[]
  loginedUser?: UserModel
  isFirst: boolean
};

const initialState: AuthState = {
  isAuthenticated: false,
  users: [],
  isFirst: true
};

const authReducer = (state: AuthState = initialState, action: any) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isFirst: false,
        users: _users
      };
    case "UPDATE_USER":
      return {
        ...state,
        isFirst: false,
        users: state.users.map(it=>{
          if(it.id == action.payload.data.id){
            return action.payload.data
          }
          return it
        })
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true
      };
    case "REGISTER":
      return {
        ...state,
        users: [...state.users, action.payload.data]
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export default authReducer;
