import React from 'react'

import { MainNav } from './main_nav'
import { NavBrand } from './nav-brand'
import { WindowLocation } from '../interfaces'

interface Props {
  className?: string;
  title: string;
  location: WindowLocation;
}

export class Header extends React.Component<Props> {
  private navbarRef: React.RefObject<HTMLElement>;

  constructor(props: Props) {
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
    if (this.navbarRef.current.classList.contains('top-nav-collapse') && navbarTopOffset < 40) {
      this.navbarRef.current.classList.remove('top-nav-collapse')
    }
    if (!this.navbarRef.current.classList.contains('top-nav-collapse') && navbarTopOffset > 60) {
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
    const {
      className,
      title,
      location
    } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const classes = [
      'layout__header',
      'navbar',
      'navbar-fixed-top'
    ]
    if (className) {
      classes.push(className)
    }
    const isRootPath = location.pathname === rootPath
    return (
      <nav
        className={classes.join(' ')}
        ref={this.navbarRef}
        role="navigation"
      >
        <NavBrand
          title={title}
          isRootPath={isRootPath}
        />
        <MainNav />
      </nav>
    )
  }
}
