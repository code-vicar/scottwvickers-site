import { Theme } from "@mui/material/styles"

declare type PathPrefix = string;

declare global {
  const __PATH_PREFIX__: string
}

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      themeType: "dark" | "light"
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom: {
      themeType: "dark" | "light"
    };
  }
}
