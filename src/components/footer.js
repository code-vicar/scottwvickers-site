import React from 'react'
import SocialButtons from './social_buttons'

export default ({ className }) => {
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
