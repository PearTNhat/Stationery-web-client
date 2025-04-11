import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { sideBarReducer } from './slices/sideBar'
import { userReducer } from './slices/user'
import { modalReducer } from './slices/modal'
import { categoryReducer } from './slices/category'
const persistConfig = {
  key: 'stationery/user',
  storage,
  whitelist: ['accessToken', 'isLoggedIn', 'userData'] // only token will be persisted, other will be cleared after
}
const persistedReducer = persistReducer(persistConfig, userReducer)
const store = configureStore({
  reducer: {
    user: persistedReducer,
    sideBar: sideBarReducer,
    modal: modalReducer,
    category: categoryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
const persistor = persistStore(store)
export { store, persistor }
