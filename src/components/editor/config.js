import React from 'react';

// Closest option I found to an Enum with ES6
export const FORMAT_OPTIONS = Object.freeze({
  BOLD: 'BOLD',
  ITALIC: 'ITALIC',
  UNDERLINE: 'UNDERLINE',
});

export const FORMAT_WRAPPER = Object.freeze({
  [FORMAT_OPTIONS.BOLD]: ({ children }) => <b>{children}</b>,
  [FORMAT_OPTIONS.ITALIC]: ({ children }) => <i>{children}</i>,
  [FORMAT_OPTIONS.UNDERLINE]: ({ children }) => <u>{children}</u>,
});
