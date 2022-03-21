import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline/CssBaseline"
import { ThemeProvider, createTheme } from "@mui/material/styles"

export const ThemeWrapper = ({ children }) => {
  const theme = createTheme({
    custom: {
      themeType: "dark"
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
