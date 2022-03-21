import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import * as FaIcons from "react-icons/fa"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { ISiteMetaData } from "../interfaces/ISiteQuery"

const SocialButtons: React.FC = () => {
  const data = useStaticQuery(graphql`
    query SocialButtonsQuery {
      site {
        siteMetadata {
          social {
            title
            url
          }
        }
      }
    }
  `)
  const siteMeta: ISiteMetaData = data.site.siteMetadata
  const social = siteMeta.social
  return (
    <Grid container direction="row" justifyContent="center">
      {social.map(network => {
        const Icon = (FaIcons as { [key: string]: React.ElementType })[
          `Fa${network.title}`
        ]
        return (
          <Grid item key={network.title}>
            <Button
              sx={{
                minWidth: "unset",
                padding: "10px",
                margin: "5px",
                borderRadius: "0"
              }}
              disableElevation={true}
              variant="contained"
              component="a"
              href={network.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
            </Button>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default SocialButtons
