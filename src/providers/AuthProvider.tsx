/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { createContext, useContext, useState } from "react";
import { UserModel } from "../models/auth/Auth";
import useBaseService from "../services/useBaseService";
import { useBottomSheet } from "../../tmd/providers/BottomSheetProvider";
import { useDispatch, useSelector } from "react-redux";
import { getAPI, patchAPI } from "../services/baseService";
import base64 from 'react-native-base64'
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKey from "../utils/StorageKey";
import moment from "moment";

export type AuthContextType = {
  login: (userid: string, password: string) => void;
  register: (data: any) => Promise<unknown>;
  getUserProfile: () => Promise<User>;
  updateUserProfile: (body: any) => Promise<unknown>;
  updateUserBudget: (body: any) => Promise<unknown>;
  logout: () => void;
  updateFirebaseToken: (token: string) => Promise<unknown>
  reloadApp: () => void;
  isLoadingLogin: boolean;
  isAuthenticated: boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: any) => {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
  const usersData = useSelector(state => state.authReducer.users);

  const dispatch = useDispatch();
  const { showErrorBS } = useBottomSheet();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const targetUser = usersData.find(it => it.email == email && it.password == password)
      if (targetUser) {
        await AsyncStorage.setItem(StorageKey.USER_ID, targetUser.id.toString())
        dispatch({
          type: "LOGIN"
        })
      } else {
        showErrorBS({
          message: "User not found !"
        });
      }
    } catch (e) {
      setIsLoadingLogin(false);
      showErrorBS(e);
    }
  };

  const register = async (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsLoadingLogin(true)
        let user: UserModel = {
          id: moment().valueOf(),
          budget: 0,
          email: data.email,
          name: data.name,
          image: "",
          password: data.password,
          phone: data.phone
        }
        dispatch({
          type: "REGISTER",
          payload: {
            data: user
          }
        })
        setIsLoadingLogin(false)
        resolve(user)
      } catch (e) {
        console.log("error nih", e);
        setIsLoadingLogin(false);
        showErrorBS(e);
        reject(e)
      }
    })
  };

  const getUserProfile = () => {
    return new Promise<UserModel>(async (resolve, reject) => {
      try {
        const userid = await AsyncStorage.getItem(StorageKey.USER_ID)
        if (userid) {
          const targetUser = usersData.find(it => it.id == userid)
          resolve(targetUser)
        } else {
          reject()
          showErrorBS({
            message: "User not found !"
          });
        }
      } catch (e) {
        reject(e)
        showErrorBS({
          message: "User not found !"
        });
      }
    })
  }

  const updateUserBudget = (body: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await getUserProfile() as UserModel
        user.budget = body.budget
        dispatch({
          type: "UPDATE_USER",
          payload: {
            data: user
          }
        })
        resolve(user)
      } catch (error) {
        showErrorBS(error)
        reject(error)
      }
    })
  }

  const updateUserProfile = (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsLoadingLogin(true)
        let user = await getUserProfile() as UserModel
        const newData: UserModel = {
          ...user,
          ...data
        }
        dispatch({
          type: "UPDATE_USER",
          payload: {
            data: newData
          }
        })
        setIsLoadingLogin(false)
        resolve(user)
      } catch (e) {
        console.log("error nih", e);
        setIsLoadingLogin(false);
        showErrorBS(e);
        reject(e)
      }
    })
  }

  const updateFirebaseToken = async (token: string) => {
    return new Promise(async (resolve, reject) => {
      // try {
      //   const res = await patchAPI('user/firebase-token', {
      //     firebase_token: token
      //   })
      //   resolve(res)
      // } catch (e) {
      //   reject(e)
      // }
    })
  }

  const reloadApp = async () => {
    dispatch({
      type: "RELOAD_SPLASH"
    })
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(StorageKey.USER_ID)
      dispatch({
        type: "LOGOUT",
      });
    } catch (e) {
      dispatch({
        type: "LOGOUT",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        updateFirebaseToken,
        isLoadingLogin,
        isAuthenticated,
        reloadApp,
        register,
        getUserProfile,
        updateUserBudget,
        updateUserProfile
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context must be use inside AuthProvider");
  return context;
};

export default AuthProvider;
