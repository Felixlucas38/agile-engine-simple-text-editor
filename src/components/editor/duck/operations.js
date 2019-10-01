import {
  updateText,
  updateFormat,
  updateColor,
  replaceWord,
  setSelection,
  clearSelection,
  setSynonyms
} from "./actions";
import axios from "axios";

const updateSelection = ({ id, value }) => dispatch => {
  dispatch(fetchSynonyms({ id, value }));
  dispatch(setSelection({ id }));
};

const fetchSynonyms = ({ id, value }) => async dispatch => {
  try {
    const { data: synonyms } = await axios.get(
      `https://api.datamuse.com/words?ml=${value}`
    );
    dispatch(setSynonyms({ id, synonyms }));
  } catch (error) {
    // To prevent a new fetching, leave it as an empty array if it fails
    dispatch(setSynonyms({ id, synonyms: [] }));
  }
};

export {
  updateText,
  updateFormat,
  updateColor,
  replaceWord,
  updateSelection,
  clearSelection,
  fetchSynonyms
};
