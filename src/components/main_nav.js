import React from "react"
import { Link } from "gatsby"
import { PrimaryNav, NavItem } from 'mineral-ui/Navigation';

const MainNav = ({ pathName }) => (
    <PrimaryNav
        minimal
    >
        <NavItem
            selected={ pathName === '/bio' }
            as={Link}
            to='/bio'
        >
            Bio
        </NavItem>
    </PrimaryNav>
)

export default MainNav
