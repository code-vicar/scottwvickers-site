import React from 'react'
import SocialButtons from './social_buttons'

interface Props {
  className?: string
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer
      className={className}
    >
      <SocialButtons />
      <span>
        Copyright © Scott Vickers {new Date().getFullYear()}
      </span>
    </footer>
  )
}
