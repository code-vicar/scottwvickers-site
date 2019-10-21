import React from 'react'
import { ThemeProvider } from 'mineral-ui/themes'
import Header from './header'
import Footer from './footer'

import '../styles/layout.scss'

export default ({ location, title, children }) => (
  <ThemeProvider>
    <div className="layout">
      <Header
        className="layout__header"
        title={title}
        location={location}
      />
      <main>{children}</main>
      <Footer className="layout__footer" />
    </div>
  </ThemeProvider>
)
