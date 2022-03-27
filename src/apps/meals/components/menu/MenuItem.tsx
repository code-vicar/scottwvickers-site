import React from "react"
import { IMenuItem } from "../../../../interfaces"

export type IMenuItemProps = Pick<IMenuItem, "name" | "description">

export const MenuItem: React.FC<IMenuItemProps> = ({ name, description }) => {
  return (
    <>
      <dt>{name}</dt>
      <dd>{description}</dd>
    </>
  )
}
