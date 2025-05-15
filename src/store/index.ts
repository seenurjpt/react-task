import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import employeeTabsReducer from './employeeTabsSlice';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    employeeTabs: employeeTabsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;