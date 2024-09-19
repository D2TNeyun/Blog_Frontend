// // store.js
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Reducer/UserSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // mặc định là localStorage cho web
import { combineReducers } from "redux";

// Cấu hình persist cho reducer user
const persistConfig = {
    key: 'root',
    storage,
};

// Kết hợp các reducer (nếu bạn có thêm reducer khác, bạn có thể thêm vào đây)
const rootReducer = combineReducers({
    user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cấu hình store để bỏ qua kiểm tra tuần tự hóa đối với các action của redux-persist
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);

export { store };

// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "../../Redux/Reducer/userSlice";

// export const store = configureStore({
//     reducer: { user: userSlice },
// })