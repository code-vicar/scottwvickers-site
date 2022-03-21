import React from "react"
import Box from "@mui/material/Box"

export const Section: React.FC = ({ children }) => {
  return <Box sx={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }}>{children}</Box>
}
