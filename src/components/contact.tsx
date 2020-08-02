import React from "react"
import { Typography } from "@material-ui/core"

interface Props {
  id: string;
}

export const Contact: React.FC<Props> = ({ id }) => (
  <>
    <div
      id={id}
      className="offset-anchor"
    />
    <Typography style={{ fontWeight: "bold" }} >Contact Me</Typography>
    <Typography>scott.w.vickers@gmail.com</Typography>
  </>
)
