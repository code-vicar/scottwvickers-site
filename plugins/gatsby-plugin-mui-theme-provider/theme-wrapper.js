import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme } from "@mui/material/styles"

export const ThemeWrapper = ({ children }) => {
  const theme = createTheme({
    palette: {
      mode: "dark"
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme={true}>
        {children}
      </CssBaseline>
    </ThemeProvider>
  )
}
