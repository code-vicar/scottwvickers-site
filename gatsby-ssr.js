import React from 'react';
import { ThemeWrapper } from './plugins/gatsby-plugin-mui-theme-provider/theme-wrapper';

export const wrapRootElement = ({ element }) => {
  return <ThemeWrapper>{element}</ThemeWrapper>;
};
