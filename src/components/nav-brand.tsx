import React from 'react'
import { Link } from 'gatsby'

interface Props {
  title: string;
  isRootPath: boolean;
}

export const NavBrand: React.FC<Props> = ({ title, isRootPath }) => {
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
