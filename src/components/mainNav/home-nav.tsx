import React from 'react'
import { MenuItem, Button, Link, LinkClassKey } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseNav, INavItem } from './base-nav'
import { IMainNavComponent, Select } from '../../interfaces'

const navItems: INavItem[] = [
  {
    title: 'About',
    url: '#about'
  },
  {
    title: 'Notes',
    url: '#notes'
  },
  {
    title: 'Contact',
    url: '#contact'
  }
]

const smoothScroll = (anchor: string) => {
  window.history.pushState({}, anchor, anchor)
  const scrollAnchor = document.querySelector(anchor)
  if (scrollAnchor) {
    scrollAnchor.scrollIntoView({
      behavior: 'smooth'
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
        width: '100%'
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
  const useStyles = makeStyles<
    Theme,
    Record<string, unknown>,
    Select<LinkClassKey, 'root'>
  >(() => ({
    root: {
      margin: '10px'
    }
  }))
  return (
    <Link
      classes={useStyles({})}
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
