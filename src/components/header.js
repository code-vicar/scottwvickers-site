import React from 'react'

import MainNav from './main_nav'
import NavBrand from './nav-brand'

export default class Header extends React.Component {
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
    if (!this.navbarRef.current.classList.contains('top-nav-collapse') && navbarTopOffset > 50) {
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

  render() {
    const { className, title, location } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const classes = [
      'layout__header',
      'navbar',
      'navbar-fixed-top'
    ]
    if (className) {
      classes.push(className)
    }
    return (
      <nav
        className={classes.join(' ')}
        ref={this.navbarRef}
        role="navigation"
      >
        <NavBrand
          title={title}
          isRootPath={location.pathname === rootPath}
        />
        <MainNav
          pathName={location.pathname}
        />
      </nav>
    )
  }
}