import React from "react"
import { MenuContextType, useMenuState } from "../../contexts/menu"
import { AuthContextType } from "../../contexts/auth"
import { loadMenu, saveMenu } from "../../utils/menuStorage"
import { GraphClient } from "../../serviceClients/graphClient/GraphClient"

export const MenuProvider: React.FC = ({ children }) => {
  const authContext = React.useContext(AuthContextType)
  const menuItems = loadMenu()
  const menuState = useMenuState(menuItems)

  React.useEffect(() => {
    const getFiles = async () => {
      const client = new GraphClient({ authContext })
      const files = await client.listFiles()
      console.log(files)
    }
    if (authContext.username) {
      getFiles()
    }
  }, [authContext])

  React.useEffect(() => {
    saveMenu(menuState.items)
  }, [menuState])
  return (
    <MenuContextType.Provider value={menuState}>
      {children}
    </MenuContextType.Provider>
  )
}
