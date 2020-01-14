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

const renderMenuItem = ({ title, url }: INavItem, setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
  <MenuItem
    key={title}
  >
    <Button
      component="a"
      style={{
        width: '100%'
      }}
      disableElevation={true}
      href={url}
      onClick={() => { setPopoverOpen(false) }}
    >
      {title}
    </Button>
  </MenuItem>
)

const HomeLink: React.FC<{ title: string, href: string }> = ({ title, href }) => {
  const useStyles = makeStyles<Theme, {}, Select<LinkClassKey, 'root'>>(() => ({
    root: {
      margin: '10px'
    }
  }))
  return (
    <Link
      classes={useStyles()}
      key={title}
      href={href}
    >
      {title}
    </Link>
  )
}

const renderNavItem = ({ title, url }: INavItem) => {
  return (
    <HomeLink
      key={title}
      href={url}
      title={title}
    />
  )
}

export const HomeNav: IMainNavComponent = () => (
  <BaseNav
    navItems={navItems}
    onRenderMenuItem={renderMenuItem}
    onRenderNavItem={renderNavItem}
  />
)