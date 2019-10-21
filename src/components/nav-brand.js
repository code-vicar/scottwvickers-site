import React from 'react'
import { Link } from 'gatsby'

export default ({ title, isRootPath }) => {
  const BrandElem = isRootPath ? 'h1' : 'h3'
  return (
    <BrandElem
      className="nav-brand"
    >
      <Link
        className="nav-brand__link"
        to={`/`}
      >
        {title}
      </Link>
    </BrandElem>
  )
}
