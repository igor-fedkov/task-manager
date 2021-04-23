import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

import {
  authReducer,
  actionsReducer,
  boardsReducer,
  listsReducer,
  cardsReducer,
  usersReducer,
  commentsReducer,
  globalReducer
} from './';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  actions: actionsReducer,
  boards: boardsReducer,
  lists: listsReducer,
  cards: cardsReducer,
  users: usersReducer,
  comments: commentsReducer,
  global: globalReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }),
});

const persistor = persistStore(store);

export  { store, persistor };
