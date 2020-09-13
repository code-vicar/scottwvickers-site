import React from "react"
import { AccountInfo, AuthenticationResult } from "@azure/msal-browser"
import { IAuth, IAuthTokenOptions, AuthState, AuthStatus } from "../../interfaces/IAuth"
import { isSSR } from "../../utils"

let msal: {
  getAccountByUsername: (username: string) => AccountInfo | null
  getTokenSilent: (username: string, scopes: string[]) => Promise<AuthenticationResult>
  signIn: () => Promise<AuthenticationResult>
  signOut: (account: AccountInfo) => Promise<void>
}
if (isSSR()) {
  msal = {
    getAccountByUsername: () => null,
    getTokenSilent: () => Promise.resolve(({} as unknown) as AuthenticationResult),
    signIn: () => Promise.resolve(({} as unknown) as AuthenticationResult),
    signOut: () => Promise.resolve()
  }
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const actualMsal = require("../../serviceClients/msal")
  msal = {
    getAccountByUsername: actualMsal.getAccountByUsername,
    getTokenSilent: actualMsal.getTokenSilent,
    signIn: actualMsal.signIn,
    signOut: actualMsal.signOut
  }
}

function getAccountByUsername(username: string): AccountInfo | undefined {
  return msal.getAccountByUsername(username) || undefined
}

export const useAuthState: (initialUsername?: string) => IAuth = (initialUsername) => {
  const [authState, setAuthState] = React.useState<AuthState>({
    status: AuthStatus.Ready,
    username: initialUsername
  })

  const username = React.useMemo(() => {
    if (authState.status !== AuthStatus.Ready) {
      return undefined
    }
    const account = authState.username ? getAccountByUsername(authState.username) : undefined
    return account ? account.username : undefined
  }, [authState.status])

  const signInCB = React.useCallback(async () => {
    console.log("signIn - AuthStatus Loading")
    setAuthState({
      status: AuthStatus.Loading
    })
    try {
      const signedIn = await msal.signIn()
      console.log("signIn - AuthStatus Ready: signed in")
      setAuthState({
        status: AuthStatus.Ready,
        username: signedIn.account.username
      })
    } catch (e) {
      console.log(e)
      console.log("signIn - AuthStatus Failure")
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
    const account = getAccountByUsername(username)
    if (!account) {
      return
    }
    setAuthState({
      status: AuthStatus.Loading
    })
    try {
      await msal.signOut(account)
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
  }, [username, msal.signOut])

  const getAccount = React.useCallback(() => {
    return username ? getAccountByUsername(username) : undefined
  }, [username])

  const getToken = React.useCallback(async (options?: IAuthTokenOptions) => {
    if (!username) {
      throw new Error("not logged in")
    }
    const scopes = options?.scopes || []
    const authResult = await msal.getTokenSilent(username, scopes)
    return authResult.accessToken
  }, [username])

  return React.useMemo(() => {
    console.log("recalculating AuthState memo, %o", authState)
    return {
      authState,
      username,
      getAccount,
      getToken,
      signIn: signInCB,
      signOut: signOutCB
    }
  }, [authState, username, getAccount, getToken, signInCB, signOutCB])
}
