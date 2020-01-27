import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Header } from './header'
import { Footer } from './footer'
import { WindowLocation, IMainNavComponent } from '../interfaces'
import { layout } from '../styles/constants'

const useStyles = makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: layout.contentSideMargin,
    paddingLeft: layout.contentSideMargin
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  main: {
    marginTop: '60px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: `${theme.breakpoints.values.sm}px`
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: `${theme.breakpoints.values.md}px`
    }
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0'
  }
}))

interface Props {
  title: string;
  location: WindowLocation;
  MainNav?: IMainNavComponent;
}

export const Layout: React.FC<Props> = ({
  location,
  title,
  children,
  MainNav
}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Header
        className={classes.header}
        title={title}
        location={location}
        MainNav={MainNav}
      />
      <main
        className={classes.main}
      >
        {children}
      </main>
      <Footer
        className={classes.footer}
      />
    </div>
  )
}
