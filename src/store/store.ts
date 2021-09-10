import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import notesReducer from './slices/notesSlice';
// import draftReducer from './slices/draftSlice';
import draftReducer from './slices/draftSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    notes: notesReducer,
    draft: draftReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
