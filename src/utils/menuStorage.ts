import { IMenuItem } from '../interfaces'

const serializeMenu: (menu: readonly IMenuItem[]) => string = menu => {
  return JSON.stringify(menu)
}

const MenuStorageKey = 'menu'

export const saveMenu: (menu: readonly IMenuItem[]) => void = menu => {
  if (typeof window === 'undefined') {
    return
  }
  const serializedMenu = serializeMenu(menu)
  window.localStorage.setItem(MenuStorageKey, serializedMenu)
}

export const loadMenu: () => readonly IMenuItem[] = () => {
  if (typeof window === 'undefined') {
    return []
  }
  const serializedMenu = window.localStorage.getItem(MenuStorageKey)
  if (!serializedMenu) {
    return []
  }
  return JSON.parse(serializedMenu)
}
