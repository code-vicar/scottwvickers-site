import React from "react"

import Typography from "@mui/material/Typography"

interface IProps {
  id: string
}

export const About: React.FC<IProps> = ({ id }) => (
  <>
    <div id={id} className="offset-anchor" />
    <Typography
      style={{
        fontWeight: "bold"
      }}
    >
      About
    </Typography>
    <Typography>My name is Scott Vickers.</Typography>
    <Typography>
      I am a software developer currently working at Microsoft.
    </Typography>
    <Typography>This is my site.</Typography>
  </>
)
