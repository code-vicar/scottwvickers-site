import { isSSR } from "../utils"

const AuthStorageKey = "username"

export const saveUsername: (username?: string) => void = username => {
  if (isSSR()) {
    return
  }
  if (!username) {
    window.localStorage.removeItem(AuthStorageKey)
  } else {
    window.localStorage.setItem(AuthStorageKey, username)
  }
}

export const loadUsername: () => string | undefined = () => {
  if (isSSR()) {
    return undefined
  }
  const username = window.localStorage.getItem(AuthStorageKey)
  if (!username) {
    return undefined
  }
  return username
}
