import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import cartReducer from "./slices/cartSlice";
import cartSummaryReducer from "./slices/totalSummarySlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineSlices({
  auth: authReducer,
  admin: adminReducer,
  cart: cartReducer,
  summary: cartSummaryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = (preloadedState) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
  });

  setupListeners(store.dispatch);

  const persistor = persistStore(store);

  return { store, persistor };
};

export const { store, persistor } = makeStore();

export const AppDispatch = store.dispatch;
export const AppThunk = store.thunk;
