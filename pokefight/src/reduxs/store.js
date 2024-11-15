import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import rankingReducer from './reducers/rankingReducer';
import favoriteReducer from './reducers/favoriteReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  ranking: rankingReducer,
  favorites: favoriteReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER'],
        warnAfter: 100,
      },
      immutableCheck: {
        warnAfter: 100,
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };