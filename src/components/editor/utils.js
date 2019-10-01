import React from "react";
import { FORMAT_WRAPPER } from "./config";

export const getFormattedWord = ({ format, color, value }) => {
  const initialValue = color ? <span style={{ color }}>{value}</span> : value;

  return format.reduce((acc, f) => {
    const Wrapper = FORMAT_WRAPPER[f];
    return <Wrapper>{acc}</Wrapper>;
  }, initialValue);
};
