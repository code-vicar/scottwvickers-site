import React from "react"
import { Link } from "gatsby"
import { makeStyles, createStyles } from "@mui/styles"

interface Props {
  title: string;
  isRootPath: boolean;
}

const useStyles = makeStyles(() => createStyles({
  root: {
    margin: 0,
    fontWeight: 900,
    textRendering: "optimizeLegibility",
    fontSize: "1.4427rem",
    lineHeight: 1.1
  },
  link: {
    boxShadow: "none",
    textDecoration: "none",
    color: "inherit"
  }
}))

export const NavBrand: React.FC<Props> = ({ title, isRootPath }) => {
  const classes = useStyles()
  const BrandElem = isRootPath ? "h1" : "h3"
  return (
    <BrandElem
      className={classes.root}
    >
      <Link
        className={classes.link}
        to={"/"}
      >
        {title}
      </Link>
    </BrandElem>
  )
}
