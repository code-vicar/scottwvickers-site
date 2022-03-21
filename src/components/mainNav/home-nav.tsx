import React from "react"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import Link from "@mui/material/Link"
import { BaseNav, INavItem } from "./base-nav"
import { IMainNavComponent } from "../../interfaces"

const navItems: INavItem[] = [
  {
    title: "About",
    url: "#about"
  },
  {
    title: "Notes",
    url: "#notes"
  },
  {
    title: "Contact",
    url: "#contact"
  }
]

const smoothScroll = (anchor: string) => {
  window.history.pushState({}, anchor, anchor)
  const scrollAnchor = document.querySelector(anchor)
  if (scrollAnchor) {
    scrollAnchor.scrollIntoView({
      behavior: "smooth"
    })
  }
}

const renderMenuItem = (
  { title, url }: INavItem,
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
) => (
  <MenuItem key={title}>
    <Button
      component="a"
      style={{
        width: "100%"
      }}
      disableElevation={true}
      href={url}
      onClick={(e: React.SyntheticEvent) => {
        e.preventDefault()
        setPopoverOpen(false)
        // setPopoverOpen state change/re-render interrupts smoothscroll
        // so put the smoothscroll on the next animation frame
        requestAnimationFrame(() => {
          smoothScroll(url)
        })
      }}
    >
      {title}
    </Button>
  </MenuItem>
)

const HomeLink: React.FC<{ title: string; href: string }> = ({
  title,
  href
}) => {
  return (
    <Link
      sx={{
        margin: "10px"
      }}
      key={title}
      href={href}
      onClick={(e: React.SyntheticEvent) => {
        e.preventDefault()
        smoothScroll(href)
      }}
    >
      {title}
    </Link>
  )
}

const renderNavItem = ({ title, url }: INavItem) => {
  return <HomeLink key={title} href={url} title={title} />
}

export const HomeNav: IMainNavComponent = () => (
  <BaseNav
    navItems={navItems}
    onRenderMenuItem={renderMenuItem}
    onRenderNavItem={renderNavItem}
  />
)
