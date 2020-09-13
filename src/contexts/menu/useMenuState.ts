import React from "react"
import { IMenu, IMenuItem } from "../../interfaces/IMenu"

export const useMenuState: (items: readonly IMenuItem[]) => IMenu = items => {
  const [menuItems, setMenuItems] = React.useState<readonly IMenuItem[]>(items)

  const updateItem = React.useCallback(
    (
      item: IMenuItem | undefined,
      updater: (item: IMenuItem | undefined) => IMenuItem | undefined,
      addIfNotFound = false
    ) => {
      if (!item) {
        // adding an item
        const updated = updater(undefined)
        if (updated) {
          setMenuItems([...menuItems, updated])
        }
        return
      }
      const idx = menuItems.findIndex(cursorItem => cursorItem === item)
      if (idx >= 0) {
        // replace or remove
        const updated = updater(menuItems[idx])
        if (updated) {
          // replacing an item
          return setMenuItems([
            ...menuItems.slice(0, idx),
            updated,
            ...menuItems.slice(idx + 1)
          ])
        }
        // removing an item
        return setMenuItems([
          ...menuItems.slice(0, idx),
          ...menuItems.slice(idx + 1)
        ])
      }
      if (addIfNotFound) {
        // adding item since the given item wasn't found
        const updated = updater(menuItems[idx])
        if (updated) {
          return setMenuItems([...menuItems, updated])
        }
      }
    },
    [menuItems, setMenuItems]
  )

  const addItem = React.useCallback(
    (item: IMenuItem) => {
      updateItem(undefined, () => item)
    },
    [menuItems, updateItem]
  )

  const removeItem = React.useCallback(
    (item: IMenuItem) => {
      updateItem(item, () => undefined)
    },
    [menuItems, updateItem]
  )

  return React.useMemo(
    () => ({
      items: menuItems,
      updateItem,
      addItem,
      removeItem,
      setMenuItems
    }),
    [menuItems, updateItem, addItem, removeItem, setMenuItems]
  )
}
