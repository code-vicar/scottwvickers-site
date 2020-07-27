import { IMenuItem } from '../interfaces'

const serializeMenu: (menu: readonly IMenuItem[]) => string = menu => {
  return JSON.stringify(menu)
}

const MenuStorageKey = 'menu'

export const saveMenu: (menu: readonly IMenuItem[]) => void = menu => {
  const serializedMenu = serializeMenu(menu)
  if (!window) {
    return
  }
  window.localStorage.setItem(MenuStorageKey, serializedMenu)
}

export const loadMenu: () => readonly IMenuItem[] = () => {
  const serializedMenu = window.localStorage.getItem(MenuStorageKey)
  if (!serializedMenu) {
    return []
  }
  return JSON.parse(serializedMenu)
}
