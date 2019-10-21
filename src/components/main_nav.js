import React from 'react'
import { Link } from 'gatsby'
import { PrimaryNav, NavItem } from 'mineral-ui/Navigation'
import { ThemeProvider } from 'mineral-ui/themes'

const MainNav = ({ pathName }) => (
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
    <PrimaryNav minimal >
      <NavItem
        selected={pathName === '/about'}
        as={Link}
        to='/about'
      >
        About
      </NavItem>
    </PrimaryNav>
  </ThemeProvider>
)

export default MainNav
