import React from "react"
import { AuthenticationResult } from "@azure/msal-browser"
import { IAuth, AuthState, AuthStatus } from "../../interfaces/IAuth"
import { isSSR } from "../../utils"

let msal: {
  signIn: () => Promise<AuthenticationResult>
  signOut: (username: string) => Promise<void>
}
if (isSSR()) {
  msal = {
    signIn: () => Promise.resolve(({} as unknown) as AuthenticationResult),
    signOut: () => Promise.resolve()
  }
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const actualMsal = require("../../microsoftGraph")
  msal = {
    signIn: actualMsal.signIn,
    signOut: actualMsal.signOut
  }
}

export const useAuthState: (initialUsername?: string) => IAuth = (initialUsername) => {
  const [authState, setAuthState] = React.useState<AuthState>({
    status: AuthStatus.Ready,
    username: initialUsername
  })

  const username = React.useMemo(() => {
    if (authState.status === AuthStatus.Ready) {
      return authState.username
    }
    return undefined
  }, [authState.status])

  const signInCB = React.useCallback(async () => {
    setAuthState({
      status: AuthStatus.Loading
    })
    try {
      const newSignIn = await msal.signIn()
      setAuthState({
        status: AuthStatus.Ready,
        username: newSignIn.account.username
      })
    } catch (e) {
      console.log(e)
      setAuthState({
        status: AuthStatus.Failure,
        error: e
      })
    }
  }, [msal.signIn])

  const signOutCB = React.useCallback(async () => {
    if (!username) {
      return
    }
    setAuthState({
      status: AuthStatus.Loading
    })
    try {
      await msal.signOut(username)
      setAuthState({
        status: AuthStatus.Ready,
        username: undefined
      })
    } catch (e) {
      console.log(e)
      setAuthState({
        status: AuthStatus.Failure,
        error: e
      })
    }
  }, [msal.signOut, username])

  return React.useMemo(() => ({
    authState,
    username,
    signIn: signInCB,
    signOut: signOutCB
  }), [signInCB, signOutCB])
}
