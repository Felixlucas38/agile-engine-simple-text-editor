import uuidv1 from "uuid/v1";
import * as types from "./types";

const initialState = {
  words: {},
  selection: null
};

const wordsReducer = (words = {}, { type, payload }) => {
  switch (type) {
    case types.UPDATE_FORMAT:
      const { id, format } = payload;
      const word = { ...words[id] };

      const isFormatApplied = word.format.find(f => f === format);
      if (isFormatApplied) {
        word.format = word.format.filter(f => f !== format);
      } else {
        word.format.push(format);
      }
      return {
        ...words,
        [id]: word
      };

    case types.UPDATE_COLOR:
      return {
        ...words,
        [payload.id]: {
          ...words[payload.id],
          color: payload.color
        }
      };

    case types.SET_SYNONYMS:
      return {
        ...words,
        [payload.id]: {
          ...words[payload.id],
          synonyms: payload.synonyms
        }
      };

    case types.REPLACE_WORD:
      return {
        ...words,
        [payload.id]: {
          ...words[payload.id],
          value: payload.word,
          synonyms: null
        }
      };

    default:
      return words;
  }
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TEXT:
      const { payload } = action;
      if (!payload) return state;

      const wordsArray = payload.trim().split(" ");
      const words = wordsArray.reduce((acc, word) => {
        const id = uuidv1();
        acc[id] = {
          id,
          value: word,
          color: "",
          format: [],
          synonyms: null
        };
        return acc;
      }, {});

      return {
        ...state,
        words
      };

    case types.UPDATE_FORMAT:
    case types.UPDATE_COLOR:
    case types.SET_SYNONYMS:
      return {
        ...state,
        words: wordsReducer(state.words, action)
      };

    case types.REPLACE_WORD:
      return {
        ...state,
        selection: null,
        words: wordsReducer(state.words, action)
      };

    case types.SET_SELECTION:
      return {
        ...state,
        selection: action.payload.id
      };

    case types.CLEAR_SELECTION:
      return {
        ...state,
        selection: null
      };

    default:
      return state;
  }
};

export default editorReducer;
