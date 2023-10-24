/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { initialStateType } from "../context/authcontext";

type Action = {
  type: any;
  payload?: any;
};

const auth_reducer = (state: initialStateType, action: Action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload,
      isAuthenticated: true,
    };
  }

  if (action.type === "LOGOUT") {
    return {
      ...state,
      user: null,
      isAuthenticated: false,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default auth_reducer;
