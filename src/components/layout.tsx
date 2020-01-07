import React from 'react'
import { ThemeProvider } from 'mineral-ui'
import { Header } from './header'
import { Footer } from './footer'
import { WindowLocation } from '../interfaces'

import '../styles/layout.scss'

interface Props {
  title: string;
  location: WindowLocation;
}

export const Layout: React.FC<Props> = ({
  location,
  title,
  children
}) => (
    <ThemeProvider>
      <div className="layout">
        <Header
          className="layout__header"
          title={title}
          location={location}
        />
        <main>{children}</main>
        <Footer
          className="layout__footer"
        />
      </div>
    </ThemeProvider>
  )
