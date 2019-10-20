import React from 'react'
import { Link } from 'gatsby'
import { PrimaryNav, NavItem } from 'mineral-ui/Navigation'
import { themed } from 'mineral-ui/themes';

const PrimaryNavThemed = themed(PrimaryNav)({
    backgroundColor: 'transparent',
})

const MainNav = ({ pathName }) => (
    <PrimaryNavThemed
        minimal
    >
        <NavItem
            selected={ pathName === '/about' }
            as={Link}
            to='/about'
        >
            About
        </NavItem>
    </PrimaryNavThemed>
)

export default MainNav
