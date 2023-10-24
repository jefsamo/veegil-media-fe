/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReactNode, createContext, useContext, useReducer } from "react";
import auth_reducer from "../reducers/authReducer";
import axios from "axios";
import { BASE_URL } from "../utils/contstants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type Props = {
  children: ReactNode;
};

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: "USER" | "ADMIN" | "";
  password: string;
};

export type initialStateType = {
  user: UserType;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const initialState: initialStateType = {
  user: {
    _id: "",
    firstName: "Wale",
    lastName: "",
    phoneNumber: "",
    email: "",
    role: "",
    password: "",
  },
  login: (_email: string, _password: string) => {},
  logout: () => {},
  isAuthenticated: false,
};

const AuthContext = createContext<initialStateType>(initialState);

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(auth_reducer, initialState);
  const { user } = state;

  const navigate = useNavigate();
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      if (res.status === 200) {
        navigate("transfer");
        localStorage.setItem("user", JSON.stringify(res.data?.user));
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", JSON.stringify(res.data?.token));
      }
      dispatch({ type: "LOGIN", payload: res.data?.user });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.setItem("user", "");
    localStorage.setItem("isAuthenticated", "false");
    localStorage.setItem("token", "");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
};
