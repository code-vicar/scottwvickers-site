import React from "react"
import { IAuth, AuthStatus } from "../../interfaces/IAuth"

export type IAuthContext = IAuth

export const defaultAuthState: IAuth = {
  authState: { status: AuthStatus.Ready, username: undefined },
  username: undefined,
  getAccount: () => { return undefined },
  getToken: () => { return Promise.resolve("") },
  signIn: () => { return Promise.resolve() },
  signOut: () => { return Promise.resolve() }
}

export const AuthContextType = React.createContext<IAuthContext>(
  defaultAuthState
)
