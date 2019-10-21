/** @jsx jsx */
import React, { useState, useEffect } from 'react' // eslint-disable-line
import { jsx, css } from '@emotion/core'
import { PrimaryNav, NavItem } from 'mineral-ui/Navigation'
import { ThemeProvider } from 'mineral-ui/themes'
import Popover from 'mineral-ui/Popover'
import Menu, { MenuItem } from 'mineral-ui/Menu'
import { FaBars } from 'react-icons/fa'

const navData = [
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

const getMenuItems = (setPopoverOpen) => (
  navData.map(({ title, url }) => (
    <MenuItem
      key={title}
      as="a"
      href={url}
      onClick={() => { setPopoverOpen(false) }}
    >
      {title}
    </MenuItem>
  ))
)

const getNavItems = () => (
  navData.map(({ title, url }) => (
    <NavItem key={title} as="a" href={url}>
      {title}
    </NavItem>
  ))
)

const MainNav = () => {
  const [popoverOpen, setPopoverOpen] = useState(false)

  useEffect(() => {
    function outsideElementClick(e) {
      if (!e || !e.target || !e.target.closest) {
        return
      }
      if (!e.target.closest('#mainNavPopover')) {
        setPopoverOpen(false)
      }
    }
    document.addEventListener('click', outsideElementClick)
    return () => {
      document.removeEventListener('click', outsideElementClick)
    }
  }, [])

  return (
    <ThemeProvider
      theme={{
        PrimaryNav_backgroundColor_minimal: 'transparent',
        PrimaryNavItem_borderColor_focus: 'transparent',
        PrimaryNavItem_borderColor_selected: 'transparent',
        PrimaryNavItem_borderColor_minimal_focus: 'transparent',
        PrimaryNavItem_borderColor_minimal_selected: 'transparent',
        PrimaryNav_paddingHorizontal: 0
      }}
    >
      <>
        <Popover
          id="mainNavPopover"
          css={css`
            @media (min-width: 768px) {
              display: none;
              visibility: hidden;
            }
          `}
          isOpen={popoverOpen}
          placement="bottom-start"
          setPopoverOpen={setPopoverOpen}
          content={
            <Menu>
              {getMenuItems(setPopoverOpen)}
            </Menu>
          }
        >
          <FaBars
            style={{
              verticalAlign: 'middle'
            }}
            onClick={() => {
              setPopoverOpen(true)
            }}
          />
        </Popover>
        <PrimaryNav
          minimal
          css={css`
          @media (max-width: 768px) {
            display: none;
            visibility: hidden;
          }
        `}
        >
          {getNavItems()}
        </PrimaryNav>
      </>
    </ThemeProvider>
  )
}

export default MainNav
