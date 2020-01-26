import React from 'react';
import { ThemeWrapper } from './theme-wrapper';

export const wrapRootElement = ({ element }) => {
  return <ThemeWrapper>{element}</ThemeWrapper>;
};
