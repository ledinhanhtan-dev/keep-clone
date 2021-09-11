import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { draftReset } from './draftSlice';

interface UIState {
  tooltip: { show: boolean; title: string; top: number; left: number };
  noteMenu: { show: boolean; top: number; left: number; isFullMenu: boolean };
  colorMenu: { show: boolean; top: number; left: number };
  noteEdit: { show: boolean };
  noteAdd: { show: boolean };
  hiddenNoteItemId: string;
  recentlyAddedTodoId: string;
}

const initialState: UIState = {
  tooltip: { show: false, title: '', top: 0, left: 0 },
  noteMenu: { show: false, top: 0, left: 0, isFullMenu: false },
  colorMenu: { show: false, top: 0, left: 0 },
  noteEdit: { show: false },
  noteAdd: { show: false },
  hiddenNoteItemId: '',
  recentlyAddedTodoId: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Tooltip
    showTooltip: (state, action) => {
      const { top } = action.payload;
      state.tooltip = { ...action.payload, top: top + window.scrollY };
    },

    hideTooltip: state => {
      if (state.tooltip.show) state.tooltip.show = false;
    },

    // NoteMenu
    showNoteMenu: (state, action) => {
      const { top } = action.payload;
      state.noteMenu = { ...action.payload, top: top + window.scrollY };
    },
    hideNoteMenu: state => {
      state.noteMenu.show = false;
    },

    // ColorMenu
    showColorMenu: (state, action) => {
      const { top } = action.payload;
      state.colorMenu = { ...action.payload, top: top + window.scrollY };
    },
    hideColorMenu: state => {
      state.colorMenu.show = false;
    },

    // NoteEdit
    showNoteEdit: state => {
      state.noteEdit.show = true;
    },
    hideNoteEdit: state => {
      state.noteEdit.show = false;
    },

    // NoteAdd
    showNoteAdd: state => {
      state.noteAdd.show = true;
    },
    hideNoteAdd: state => {
      state.noteAdd.show = false;
    },

    // NoteItem
    setHiddenNoteId: (state, action) => {
      state.hiddenNoteItemId = action.payload;
    },
    resetHiddenNoteId: state => {
      state.hiddenNoteItemId = '';
    },

    // TodoItem
    registerAddedTodoId: (state, action) => {
      state.recentlyAddedTodoId = action.payload;
    },

    resetAddedTodoId: state => {
      state.recentlyAddedTodoId = '';
    },
  },
});

const { hideNoteAdd } = uiSlice.actions;

// Action creators
export const {
  showTooltip,
  showNoteMenu,
  showColorMenu,
  showNoteEdit,
  showNoteAdd,

  hideTooltip,
  hideNoteMenu,
  hideColorMenu,
  hideNoteEdit,

  setHiddenNoteId,
  resetHiddenNoteId,
  registerAddedTodoId,
  resetAddedTodoId,
} = uiSlice.actions;

// Selectors
export const selectUIState = (state: RootState) => state.ui;
export const selectTooltip = (state: RootState) => state.ui.tooltip;
export const selectNoteMenu = (state: RootState) => state.ui.noteMenu;
export const selectColorMenu = (state: RootState) => state.ui.colorMenu;
export const selectNoteEdit = (state: RootState) => state.ui.noteEdit;
export const selectNoteAdd = (state: RootState) => state.ui.noteAdd;
export const selectHiddenNoteId = (state: RootState) => state.ui.hiddenNoteItemId;

// Reducer
export default uiSlice.reducer;

export const hideNoteAddAndResetDraft = (): AppThunk => dispatch => {
  dispatch(hideNoteAdd());
  dispatch(draftReset());
};
