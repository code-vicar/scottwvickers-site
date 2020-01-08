import React from 'react'
import { MenuItem, NavItem } from 'mineral-ui'
import { BaseNav, INavItem } from './base-nav'
import { IMainNavComponent } from '../../interfaces'

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
    as="a"
    href={url}
    onClick={() => { setPopoverOpen(false) }}
  >
    {title}
  </MenuItem>
)

const renderNavItem = ({ title, url }: INavItem) => (
  <NavItem
    key={title}
    as={"a"}
    href={`/${url}`}
  >
    {title}
  </NavItem>
)

export const HomeNav: IMainNavComponent = () => (
  <BaseNav
    navItems={navItems}
    onRenderMenuItem={renderMenuItem}
    onRenderNavItem={renderNavItem}
  />
)
