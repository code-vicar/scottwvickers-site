import React from 'react'
// import { ThemeProvider } from '@material-ui/core/styles'; TODO: enable dark theme
import { Header } from './header'
import { Footer } from './footer'
import { WindowLocation, IMainNavComponent } from '../interfaces'

import '../styles/layout.scss'

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
}) => (
    <div className="layout">
      <Header
        className="layout__header"
        title={title}
        location={location}
        MainNav={MainNav}
      />
      <main
        style={{
          marginTop: '20px'
        }}
      >
        {children}
      </main>
      <Footer
        className="layout__footer"
      />
    </div>
  )
