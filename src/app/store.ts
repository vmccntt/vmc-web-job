import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import screenReducer from '../screens/screensReducer';
import AuthReducer from './authSlice';
// import counterReducer from "../features/counter/counterSlice";
import commonReducer from './commonSlice';
// import { persistStore } from "redux-persist";
// import { combineReducers } from "redux";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistReducers = combineReducers({
  common: commonReducer,
  auth: AuthReducer,
  screens: screenReducer,
});

const _getMiddleware = (getDefaultMiddleware: any) => {
  if (process.env.NODE_ENV === 'development') {
    return getDefaultMiddleware({ serializableCheck: false }).concat(logger);
  }
  return getDefaultMiddleware({ serializableCheck: false });
};

const reducers = persistReducer(persistConfig, persistReducers);
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => _getMiddleware(getDefaultMiddleware),
});
export const persistor = persistStore(store);
// export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
