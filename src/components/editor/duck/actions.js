import * as types from "./types";

export const updateText = payload => ({
  type: types.UPDATE_TEXT,
  payload
});

export const updateFormat = payload => ({
  type: types.UPDATE_FORMAT,
  payload
});

export const updateColor = payload => ({
  type: types.UPDATE_COLOR,
  payload
});

export const setSelection = payload => ({
  type: types.SET_SELECTION,
  payload
});

export const replaceWord = payload => ({
  type: types.REPLACE_WORD,
  payload
});

export const clearSelection = () => ({ type: types.CLEAR_SELECTION });

export const setSynonyms = payload => ({ type: types.SET_SYNONYMS, payload });
