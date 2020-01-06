import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import * as FaIcons from 'react-icons/fa'
import { Flex, FlexItem } from 'mineral-ui'
import { Button } from 'mineral-ui'
import { ISiteMeta } from '../interfaces/siteMetadata'

const SocialButtons: React.FC<{}> = () => {
  const data = useStaticQuery(graphql`
    query SocialButtonsQuery {
      site {
        siteMetadata {
          social {
            title,
            url
          }
        }
      }
    }
  `)
  const siteMeta: ISiteMeta = data.site.siteMetadata
  const social = siteMeta.social
  return (
    <Flex>
      {
        social.map(network => {
          const Icon = (FaIcons as { [key: string]: React.ElementType })[`Fa${network.title}`];
          return (
            <FlexItem key={network.title}>
              <Button as="a"
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
              </Button>
            </FlexItem>
          )
        })
      }
    </Flex>
  )
}

export default SocialButtons
