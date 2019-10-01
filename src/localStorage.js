const WORDS_STATE = "state";

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(WORDS_STATE, serializedState);
  } catch (error) {
    /* ... */
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(WORDS_STATE);

    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};
