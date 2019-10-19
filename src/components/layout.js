/** @jsx jsx */
import React from "react"
import { Link } from "gatsby"
import { ThemeProvider } from 'mineral-ui/themes';
import { css, jsx } from '@emotion/core'

import { rhythm, scale } from "../utils/typography"
import MainNav from './main_nav'
import SocialButtons from "./social_buttons";

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
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
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
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
        </h3>
      )
    }
    return (
      <ThemeProvider>
        <>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-left: auto;
            margin-right: auto;
            max-width: ${rhythm(24)};
            padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
            minHeight: 600;
          `}
        >
          <header
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            {header}
            <MainNav
              pathName={location.pathname}
            />
          </header>
          <main>{children}</main>
          <footer
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <SocialButtons />
            <span
              style={{
                marginTop: rhythm(1 / 3),
              }}
            >
              Copyright © Scott Vickers {new Date().getFullYear()}
            </span>
          </footer>
        </div>
        </>
      </ThemeProvider>
    )
  }
}

export default Layout
