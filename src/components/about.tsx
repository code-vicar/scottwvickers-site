import React from 'react'
import { Text } from 'mineral-ui'

interface Props {
  id: string;
}

const About: React.FC<Props> = ({ id }) => (
  <>
    <div
      id={id}
      className="offset-anchor"
    />
    <Text fontWeight="extraBold">
      About
    </Text>
    <Text>
      My name is Scott Vickers.
    </Text>
    <Text>
      I am a software developer currently working at Microsoft.
    </Text>
    <Text>
      This is my site.
    </Text>
  </>
)
