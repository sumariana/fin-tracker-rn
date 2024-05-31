/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistCombineReducers, persistStore } from "redux-persist";

import authReducer from "../reducers/authReducer";
import { createStore } from "redux";
import splashReducer from "../reducers/splashReducer";
import { PersistConfig } from "redux-persist/es/types";
import mutationReducer from "../reducers/mutationReducer";

const persistConfig: PersistConfig<unknown> = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["splashReducer"],
};

export const rootReducer = {
  authReducer,
  splashReducer,
  mutationReducer
};

const combinePersist = persistCombineReducers(persistConfig, rootReducer);

export const store = createStore(combinePersist);
export const persistor = persistStore(store);
