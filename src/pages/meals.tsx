import React from "react"
import { graphql } from "gatsby"
import { Typography } from "@material-ui/core"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { MealPlanner } from "../components/mealPlanner"

import { ISiteMetaData, IGatsbyPageProps } from "../interfaces"

interface Props extends IGatsbyPageProps {
  data: {
    site: {
      siteMetadata: Pick<ISiteMetaData, "title">
    }
  }
}

const Meals: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Meal planner" />
      <Typography component="h2">Meal planner</Typography>
      <MealPlanner />
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
