import { createSelector } from "reselect";
import { NAMESPACE } from "./types";

export const getWords = state => state[NAMESPACE].words;

export const getSelection = state => state[NAMESPACE].selection;

export const getSelectedWord = createSelector(
  getWords,
  getSelection,
  (words, selection) => words[selection]
);

export const shouldInitialize = createSelector(
  getWords,
  words => Object.keys(words).length === 0
);
