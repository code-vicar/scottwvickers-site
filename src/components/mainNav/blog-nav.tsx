import React from 'react'
import { MenuItem, NavItem } from 'mineral-ui'
import { navigate } from 'gatsby'
import { BaseNav, INavItem } from './base-nav'
import { IMainNavComponent } from '../../interfaces'

const navItems: INavItem[] = [
  {
    title: 'All Notes',
    url: '/notes'
  }
]

const renderMenuItem = ({ title, url }: INavItem, setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
  <MenuItem
    key={title}
    as="a"
    href={url}
    onClick={(e: MouseEvent) => {
      e.preventDefault();
      setPopoverOpen(false)
      navigate(url)
    }}
  >
    {title}
  </MenuItem>
)

const renderNavItem = ({ title, url }: INavItem) => (
  <NavItem
    key={title}
    as={"a"}
    href={url}
    onClick={(e: MouseEvent) => {
      e.preventDefault();
      navigate(url)
    }}
  >
    {title}
  </NavItem>
)

export const BlogNav: IMainNavComponent = () => (
  <BaseNav
    navItems={navItems}
    onRenderMenuItem={renderMenuItem}
    onRenderNavItem={renderNavItem}
  />
)
