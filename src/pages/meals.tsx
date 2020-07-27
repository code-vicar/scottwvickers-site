import React from 'react'
import { graphql } from 'gatsby'
import { Typography, Grid, Button } from '@material-ui/core'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import { Menu, MenuItems } from '../components/menu'
import { ISiteMetaData, IGatsbyPageProps } from '../interfaces'

interface Props extends IGatsbyPageProps {
  data: {
    site: {
      siteMetadata: Pick<ISiteMetaData, 'title'>
    }
  }
}

const Meals: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Meal planner" />
      <Typography component="h2">Meal planner</Typography>
      <Grid container direction="row">
        <Grid item xs component="section" container direction="column">
          <Typography component="header">Menu Items</Typography>
          <Menu>
            <MenuItems />
            <Button variant="contained" color="primary">
              Add new menu item
            </Button>
          </Menu>
        </Grid>
        <Grid item xs container></Grid>
      </Grid>
    </Layout>
  )
}

export default Meals

export const pageQuery = graphql`
  query mealsPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
