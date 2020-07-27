import React from 'react'
import { IMenu } from '../../interfaces/IMenu'

export type IMenuContext = IMenu

export const defaultMenuState: IMenu = {
  items: [],
  addItem: () => undefined,
  removeItem: () => undefined,
  updateItem: () => undefined
}

export const MenuContextType = React.createContext<IMenuContext>(
  defaultMenuState
)
