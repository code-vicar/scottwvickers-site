import React from "react"
import { MenuContextType, useMenuState } from "../../../../contexts/menu"
import { AuthContextType } from "../../../../contexts/auth"
import { loadMenu, saveMenu } from "../../../../utils/menuStorage"
import { useGraphClient } from "../../../../serviceClients/graphClient/useGraphClient"

export const MenuProvider: React.FC = ({ children }) => {
  const authContext = React.useContext(AuthContextType)
  const menuItems = loadMenu()
  const menuState = useMenuState(menuItems)
  const graphClient = useGraphClient()

  React.useEffect(() => {
    if (authContext.username) {
      graphClient.listFiles()
    }
  }, [authContext, graphClient])

  React.useEffect(() => {
    saveMenu(menuState.items)
  }, [menuState])
  return (
    <MenuContextType.Provider value={menuState}>
      {children}
    </MenuContextType.Provider>
  )
}
