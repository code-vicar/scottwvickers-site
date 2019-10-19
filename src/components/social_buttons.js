import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import * as FaIcons from "react-icons/fa"
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Button from 'mineral-ui/Button';

const SocialButtons = () => {
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
  const social = data.site.siteMetadata.social
  return (
    <Flex>
      {
        social.map(network => {
          const Icon = FaIcons[`Fa${network.title}`];
          return (
            <FlexItem key={network.title}>
              <Button as="a"
                href={ network.url }
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
