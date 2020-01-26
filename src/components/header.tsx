import React, { useRef, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { NavBrand } from './nav-brand'
import { WindowLocation, IMainNavComponent } from '../interfaces'
import { layout, navbar } from '../styles/constants'

interface Props {
  className?: string;
  title: string;
  location: WindowLocation;
  MainNav?: IMainNavComponent;
}

const useStyles = makeStyles(theme => createStyles({
  root: {
    minHeight: '60px',
    background: theme.palette.background.default,
    margin: `0 -${layout.contentSideMargin}`,
    padding: '0 20px',
    borderBottom: `1px solid ${navbar.bottomBorderColor}`,
    textTransform: 'uppercase',
    '& a': {
      boxShadow: 'none',
      color: 'inherit'
    },
    [theme.breakpoints.up('sm')]: {
      borderBottom: 'none',
      letterSpacing: '1px',
      '-webkit-transition': 'background .5s ease-in-out, min-height 1s ease-in-out',
      '-moz-transition': 'background .5s ease-in-out, min-height 1s ease-in-out',
      transition: 'background .5s ease-in-out, min-height 1s ease-in-out'
    }
  },
  collapsed: {
    [theme.breakpoints.up('sm')]: {
      minHeight: '50px',
      background: theme.palette.type === 'dark' ? navbar.colorCollapsedDark : navbar.colorCollapsed,
      borderBottom: `1px solid ${navbar.bottomBorderColor}`
    }
  },
  fixedTop: {
    borderWidth: '0 0 1px',
    position: 'sticky',
    top: 0,
    zIndex: 1030
  }
}))

export const Header: React.FC<Props> = ({ className, title, location, MainNav }) => {
  const styles = useStyles()
  const navbarRef: React.MutableRefObject<HTMLElement | null> = useRef(null)

  const toggleNavCollapse = () => {
    if (!navbarRef.current || !window) {
      return
    }
    const navbarTopOffset = navbarRef.current.getBoundingClientRect().top + window.pageYOffset
    if (navbarRef.current.classList.contains(styles.collapsed) && navbarTopOffset < 20) {
      navbarRef.current.classList.remove(styles.collapsed)
    }
    if (!navbarRef.current.classList.contains(styles.collapsed) && navbarTopOffset > 40) {
      navbarRef.current.classList.add(styles.collapsed)
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
  const classes = [styles.root, styles.fixedTop]
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
