/** @jsx jsx */
import React, { useState, useEffect } from 'react' // eslint-disable-line
import { Link } from 'gatsby'
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

const getMenuItems = ({ isRootPath, setPopoverOpen }) => (
  navData.map(({ title, url }) => {
    if (!isRootPath) {
      return (
        <MenuItem
          key={title}
          as={Link}
          href={`/${url}`}
        >
          {title}
        </MenuItem>
      )
    }
    return (
      <MenuItem
        key={title}
        as="a"
        href={url}
        onClick={() => { setPopoverOpen(false) }}
      >
        {title}
      </MenuItem>
    )
  })
)

const getNavItems = ({ isRootPath }) => (
  navData.map(({ title, url }) => {
    if (!isRootPath) {
      return (
        <NavItem
          key={title}
          as={Link}
          href={`/${url}`}
        >
          {title}
        </NavItem>
      )
    }
    return (
      <NavItem
        key={title}
        as="a"
        href={url}
      >
        {title}
      </NavItem>
    )
  })
)

const MainNav = ({ isRootPath }) => {
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
          placement="left"
          setPopoverOpen={setPopoverOpen}
          content={
            <Menu>
              {getMenuItems({ isRootPath, setPopoverOpen })}
            </Menu>
          }
        >
          <div
            style={{
              padding: '20px',
              margin: '-20px'
            }}
            onClick={() => {
              setPopoverOpen(true)
            }}
          >
            <FaBars
              style={{
                verticalAlign: 'middle'
              }}
            />
          </div>
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
          {getNavItems({ isRootPath })}
        </PrimaryNav>
      </>
    </ThemeProvider>
  )
}

export default MainNav
