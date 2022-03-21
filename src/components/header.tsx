import React, { useRef, useEffect } from "react"
import { makeStyles, createStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { NavBrand } from "./nav-brand"
import { WindowLocation, IMainNavComponent } from "../interfaces"
import { layout, navbar } from "../styles/constants"

interface Props {
  className?: string;
  title: string;
  location: WindowLocation;
  MainNav?: IMainNavComponent;
}

const useStyles = makeStyles<Theme>(theme => createStyles({
  root: {
    minHeight: "60px",
    background: theme.palette.background.default,
    margin: `0 -${layout.contentSideMargin}`,
    padding: "0 20px",
    borderBottom: `1px solid ${navbar.bottomBorderColor}`,
    textTransform: "uppercase",
    "& a": {
      boxShadow: "none",
      color: "inherit"
    },
    [theme.breakpoints.up("sm")]: {
      borderBottom: "none",
      letterSpacing: "1px",
      "-webkit-transition": "background .5s ease-in-out, min-height .5s ease-in-out",
      "-moz-transition": "background .5s ease-in-out, min-height .5s ease-in-out",
      transition: "background .5s ease-in-out, min-height .5s ease-in-out"
    }
  },
  navContainer: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: `${theme.breakpoints.values.sm}px`
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: `${theme.breakpoints.values.md}px`
    }
  },
  collapsed: {
    [theme.breakpoints.up("sm")]: {
      minHeight: "50px",
      background: theme.custom.themeType === "dark" ? navbar.colorCollapsedDark : navbar.colorCollapsed,
      borderBottom: `1px solid ${navbar.bottomBorderColor}`
    }
  },
  fixedTop: {
    borderWidth: "0 0 1px",
    position: "fixed",
    display: "flex",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1030
  }
}))

export const Header: React.FC<Props> = ({ className, title, location, MainNav }) => {
  const styles = useStyles()
  const navbarRef: React.MutableRefObject<HTMLElement | null> = useRef(null)

  const toggleNavCollapse = () => {
    if (!navbarRef.current || !window) {
      return
    }
    const navbarTopOffset = navbarRef.current.getBoundingClientRect().top + window.pageYOffset
    if (navbarRef.current.classList.contains(styles.collapsed) && navbarTopOffset <= navbar.collapseOffset) {
      navbarRef.current.classList.remove(styles.collapsed)
    }
    if (!navbarRef.current.classList.contains(styles.collapsed) && navbarTopOffset > navbar.collapseOffset) {
      navbarRef.current.classList.add(styles.collapsed)
    }
  }

  const onWindowScroll = () => {
    if (window) {
      window.requestAnimationFrame(() => { toggleNavCollapse() })
    }
  }

  useEffect(() => {
    toggleNavCollapse()
    document.addEventListener("scroll", onWindowScroll)
    return () => {
      document.removeEventListener("scroll", onWindowScroll)
    }
  }, [])

  const rootPath = `${__PATH_PREFIX__}/`
  const classes = [styles.navContainer]
  if (className) {
    classes.push(className)
  }
  const isRootPath = location.pathname === rootPath
  return (
    <nav
      className={[styles.root, styles.fixedTop].join(" ")}
      ref={navbarRef}
      role="navigation"
    >
      <section
        className={classes.join(" ")}
      >
        <NavBrand
          title={title}
          isRootPath={isRootPath}
        />
        {MainNav ? <MainNav /> : null}
      </section>
    </nav>
  )
}
