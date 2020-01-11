import React, { useRef, useEffect } from 'react'
import { NavBrand } from './nav-brand'
import { WindowLocation, IMainNavComponent } from '../interfaces'

interface Props {
  className?: string;
  title: string;
  location: WindowLocation;
  MainNav?: IMainNavComponent;
}

export const Header: React.FC<Props> = ({ className, title, location, MainNav }) => {
  const navbarRef: React.MutableRefObject<HTMLElement | null> = useRef(null)

  const toggleNavCollapse = () => {
    if (!navbarRef.current || !window) {
      return
    }
    const navbarTopOffset = navbarRef.current.getBoundingClientRect().top + window.pageYOffset
    if (navbarRef.current.classList.contains('top-nav-collapse') && navbarTopOffset < 20) {
      navbarRef.current.classList.remove('top-nav-collapse')
    }
    if (!navbarRef.current.classList.contains('top-nav-collapse') && navbarTopOffset > 40) {
      navbarRef.current.classList.add('top-nav-collapse')
    }
  }

  const onWindowScroll = () => {
    if (window) {
      window.requestAnimationFrame(() => { toggleNavCollapse() })
    }
  }

  useEffect(() => {
    toggleNavCollapse()
    document.addEventListener('scroll', onWindowScroll)
    return () => {
      document.removeEventListener('scroll', onWindowScroll)
    }
  }, [])

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
      ref={navbarRef}
      role="navigation"
    >
      <NavBrand
        title={title}
        isRootPath={isRootPath}
      />
      {MainNav ? <MainNav /> : null}
    </nav>
  )
}
