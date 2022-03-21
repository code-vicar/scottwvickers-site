import React, { MouseEvent } from "react"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import Link from "@mui/material/Link"
import { navigate } from "gatsby"
import { BaseNav, INavItem } from "./base-nav"
import { IMainNavComponent } from "../../interfaces"

const navItems: INavItem[] = [
  {
    title: "All Notes",
    url: "/notes"
  }
]

const renderMenuItem = ({ title, url }: INavItem, setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
  <MenuItem
    key={title}
  >
    <Button
      component="a"
      sx={{
        width: "100%"
      }}
      disableElevation={true}
      href={url}
      onClick={(e: MouseEvent) => {
        e.preventDefault()
        setPopoverOpen(false)
        navigate(url)
      }}
    >
      {title}
    </Button>
  </MenuItem>
)

const renderNavItem = ({ title, url }: INavItem) => (
  <Link
    key={title}
    href={url}
    onClick={(e: MouseEvent) => {
      e.preventDefault()
      navigate(url)
    }}
  >
    {title}
  </Link>
)

export const BlogNav: IMainNavComponent = () => (
  <BaseNav
    navItems={navItems}
    onRenderMenuItem={renderMenuItem}
    onRenderNavItem={renderNavItem}
  />
)
