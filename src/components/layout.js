import React from 'react'
import { Link } from 'gatsby'
import { ThemeProvider } from 'mineral-ui/themes'
import styled from '@emotion/styled'

import { rhythm, scale } from '../utils/typography'
import MainNav from './main_nav'
import SocialButtons from './social_buttons'

import '../styles/layout.scss'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.navbarRef = React.createRef()
    this.toggleNavCollapse = this.toggleNavCollapse.bind(this)
    this.onWindowScroll = this.onWindowScroll.bind(this)
  }

  toggleNavCollapse() {
    if (!this.navbarRef.current || !window) {
      return
    }
    const navbarTopOffset = this.navbarRef.current.getBoundingClientRect().top + window.pageYOffset
    if (this.navbarRef.current.classList.contains('top-nav-collapse') && navbarTopOffset < 30) {
      this.navbarRef.current.classList.remove('top-nav-collapse')
    }
    if (!this.navbarRef.current.classList.contains('top-nav-collapse') && navbarTopOffset > 80) {
      this.navbarRef.current.classList.add('top-nav-collapse')
    }
  }

  onWindowScroll() {
    if (window) {
      window.requestAnimationFrame(() => { this.toggleNavCollapse() })
    }
  }

  componentDidMount() {
    this.toggleNavCollapse()
    document.addEventListener('scroll', this.onWindowScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onWindowScroll)
  }

  renderHeader(title, isRootPath) {
    let HeaderElem = 'h3'
    let headerStyle = {
      margin: 0
    }
    
    if (isRootPath) {
      HeaderElem = 'h1'
      headerStyle = {
        ...headerStyle,
        ...scale(1.5)
      }
    }

    return (
      <HeaderElem
        style={headerStyle}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </HeaderElem>
    )
  }

  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    const LayoutContainer = styled.div`
      display: flex;
      flex-direction: column;
      margin-left: auto;
      margin-right: auto;
      max-width: ${rhythm(24)};
      padding: ${rhythm(3 / 4)};
      min-height: 600px;
    `

    return (
      <ThemeProvider>
        <LayoutContainer>
          <nav
            ref={this.navbarRef}
            className="layout__header navbar navbar-custom navbar-fixed-top"
            role="navigation"
          >
            {this.renderHeader(title, location.pathname === rootPath)}
            <MainNav
              pathName={location.pathname}
            />
          </nav>
          <main>{children}</main>
          <footer className="layout__footer" >
            <SocialButtons />
            <span
              style={{
                marginTop: rhythm(1 / 3),
              }}
            >
              Copyright © Scott Vickers {new Date().getFullYear()}
            </span>
          </footer>
        </LayoutContainer>
      </ThemeProvider>
    )
  }
}

export default Layout
