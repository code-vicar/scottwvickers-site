import React, { useState, useEffect, useRef } from "react"
import { FaBars } from "react-icons/fa"
import { useTheme } from "@material-ui/core/styles"
import { Menu, IconButton, useMediaQuery } from "@material-ui/core"

export interface INavItem {
  title: string;
  url: string;
}

interface Props {
  navItems: INavItem[]
  onRenderMenuItem: (navItem: INavItem, setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>) => JSX.Element
  onRenderNavItem: (navItem: INavItem) => JSX.Element
}

export const BaseNav: React.FC<Props> = ({ navItems, onRenderMenuItem, onRenderNavItem }) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const anchorRef = useRef<null | HTMLButtonElement>(null)
  const theme = useTheme()
  const gtSmall = useMediaQuery(theme.breakpoints.up("sm"))

  useEffect(() => {
    function outsideElementClick (e?: MouseEvent) {
      if (!e || !e.target || !(e.target as Element).closest) {
        return
      }
      if (!(e.target as Element).closest("#mainNavPopover")) {
        setPopoverOpen(false)
      }
    }
    document.addEventListener("click", outsideElementClick)
    return () => {
      document.removeEventListener("click", outsideElementClick)
    }
  }, [])

  // on screens > sm breakpoint render the nav button
  if (gtSmall) {
    return (
      <span>
        {navItems.map(navItem => onRenderNavItem(navItem))}
      </span>
    )
  }
  // on screens <= sm breakpoint render a menu button with nav in popover
  return (
    <div id="mainNavPopover">
      <IconButton
        ref={anchorRef}
        aria-label="Menu"
        style={{
          padding: "20px",
          margin: "-20px"
        }}
        onClick={() => {
          setPopoverOpen(true)
        }}
      >
        <FaBars
          style={{
            verticalAlign: "middle"
          }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorRef.current}
        open={popoverOpen}
      >
        {navItems.map(navItem => onRenderMenuItem(navItem, setPopoverOpen))}
      </Menu>
    </div>
  )
}
