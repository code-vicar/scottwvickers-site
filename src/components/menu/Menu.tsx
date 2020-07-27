import React from 'react'
import { MenuContextType, useMenuState } from '../../contexts/menu'
import { loadMenu, saveMenu } from '../../utils/menuStorage'

export const Menu: React.FC = ({ children }) => {
  const menuItems = loadMenu()
  const menuState = useMenuState(menuItems)

  React.useEffect(() => {
    saveMenu(menuState.items)
  }, [menuState])
  return (
    <MenuContextType.Provider value={menuState}>
      {children}
    </MenuContextType.Provider>
  )
}
