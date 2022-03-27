import React, { useRef, useEffect } from "react"
import { css } from "@emotion/react"
import { useTheme } from "@mui/material/styles"
import { NavBrand } from "./nav-brand"
import { WindowLocation, IMainNavComponent } from "../interfaces"
import { layout, navbar } from "../styles/constants"

interface Props {
  className?: string;
  title: string;
  location: WindowLocation;
  MainNav?: IMainNavComponent;
}

export const Header: React.FC<Props> = ({ className, title, location, MainNav }) => {
  const theme = useTheme()
  const navbarRef: React.MutableRefObject<HTMLElement | null> = useRef(null)
  const syncNavbarStateCallback = React.useRef<() => void>()
  const [isCollapsed, setCollapsed] = React.useState<boolean>(false)

  React.useEffect(() => {
    syncNavbarStateCallback.current = () => {
      if (!navbarRef.current || !window) {
        return
      }
      const navbarTopOffset = navbarRef.current.getBoundingClientRect().top + window.pageYOffset
      setCollapsed(navbarTopOffset > navbar.collapseOffset)
    }
    // syncNavbarStateCallback is called asynchronously with animation frame callback
    // and the component could have unmounted between requesting animation frame and callback
    // so making sure to remove the callback ref on unmount.
    return () => {
      syncNavbarStateCallback.current = undefined
    }
  }, [navbarRef.current, syncNavbarStateCallback, setCollapsed])

  const navDefaultStyle = React.useMemo(() => (css`
      min-height: 60px;
      background: ${theme.palette.background.default};
      margin: 0 -${layout.contentSideMargin};
      padding: 0 20px;
      border-bottom: 1px solid ${navbar.bottomBorderColor};
      text-transform: uppercase;
      a {
        box-shadow: none;
        color: inherit;
      };
      ${theme.breakpoints.up("sm")} {
        border-bottom: none;
        letter-spacing: 1px;
        -webkit-transition: background .5s ease-in-out, min-height .5s ease-in-out;
        -moz-transition: background .5s ease-in-out, min-height .5s ease-in-out;
        transition: background .5s ease-in-out, min-height .5s ease-in-out;
      }
    `
  ), [theme])

  const navCollapsedStyle = React.useMemo(() => {
    if (!isCollapsed) {
      return undefined
    }
    return css`
      ${theme.breakpoints.up("sm")} {
        min-height: 50px;
        background: ${theme.palette.mode === "dark" ? navbar.colorCollapsedDark : navbar.colorCollapsed};
        border-bottom: 1px solid ${navbar.bottomBorderColor}
      }
    `
  }, [theme, isCollapsed])

  const fixedTopStyle = React.useMemo(() => {
    return css`
    border-width: 0 0 1px;
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1030;
  `
  }, [])

  const navbarStyle = React.useMemo(() => {
    return css`
      ${navDefaultStyle}
      ${fixedTopStyle}
      ${navCollapsedStyle}
    `
  }, [navDefaultStyle, fixedTopStyle, navCollapsedStyle])

  const navContainerStyle = React.useMemo(() => {
    return css`
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
      ${theme.breakpoints.up("sm")} {
        max-width: ${theme.breakpoints.values.sm}px;
      };
      ${theme.breakpoints.up("md")} {
        max-width: ${theme.breakpoints.values.md}px;
      };
    `
  }, [theme])

  const onWindowScroll = () => {
    if (window) {
      window.requestAnimationFrame(() => { syncNavbarStateCallback.current?.() })
    }
  }

  useEffect(() => {
    syncNavbarStateCallback.current?.()
    document.addEventListener("scroll", onWindowScroll)
    return () => {
      document.removeEventListener("scroll", onWindowScroll)
    }
  }, [syncNavbarStateCallback.current])

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  return (
    <nav
      css={navbarStyle}
      ref={navbarRef}
      role="navigation"
    >
      <section
        css={navContainerStyle}
        className={className}
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
