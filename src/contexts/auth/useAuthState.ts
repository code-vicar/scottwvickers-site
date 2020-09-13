import React from "react"
import { AccountInfo, AuthenticationResult } from "@azure/msal-browser"
import { IAuth, AuthState, AuthStatus } from "../../interfaces/IAuth"
import { isSSR } from "../../utils"

let msal: {
  getAccountByUsername: (username: string) => AccountInfo | null
  handleRedirectPromise: () => Promise<AuthenticationResult | null>
  signIn: () => Promise<AuthenticationResult>
  signOut: (account: AccountInfo) => Promise<void>
}
if (isSSR()) {
  msal = {
    getAccountByUsername: () => null,
    handleRedirectPromise: () => Promise.resolve(null),
    signIn: () => Promise.resolve(({} as unknown) as AuthenticationResult),
    signOut: () => Promise.resolve()
  }
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const actualMsal = require("../../microsoftGraph")
  msal = {
    getAccountByUsername: actualMsal.getAccountByUsername,
    handleRedirectPromise: actualMsal.handleRedirectPromise,
    signIn: actualMsal.signIn,
    signOut: actualMsal.signOut
  }
}

export const useAuthState: (initialUsername?: string) => IAuth = (initialUsername) => {
  const initAccountInfo = initialUsername ? msal.getAccountByUsername(initialUsername) || undefined : undefined

  const [authState, setAuthState] = React.useState<AuthState>({
    status: AuthStatus.Ready,
    accountInfo: initAccountInfo
  })

  const accountInfo = React.useMemo(() => {
    if (authState.status === AuthStatus.Ready) {
      return authState.accountInfo
    }
    return undefined
  }, [authState.status])

  const handleRedirectPromiseCB = React.useCallback(async () => {
    console.log("handleRedirectPromise - AuthStatus Loading")
    setAuthState({
      status: AuthStatus.Loading
    })
    try {
      const signedIn = await msal.handleRedirectPromise()
      if (signedIn) {
        console.log("handleRedirectPromise - AuthStatus Ready: signed in")
        setAuthState({
          status: AuthStatus.Ready,
          accountInfo: signedIn.account
        })
      } else {
        console.log("handleRedirectPromise - AuthStatus Ready: no-op")
        setAuthState({
          status: AuthStatus.Ready,
          accountInfo
        })
      }
    } catch (e) {
      console.log(e)
      console.log("handleRedirectPromise - AuthStatus Failure")
      setAuthState({
        status: AuthStatus.Failure,
        error: e
      })
    }
  }, [accountInfo, msal.handleRedirectPromise])

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
        accountInfo: signedIn.account
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
    if (!accountInfo) {
      return
    }
    setAuthState({
      status: AuthStatus.Loading
    })
    try {
      await msal.signOut(accountInfo)
      setAuthState({
        status: AuthStatus.Ready,
        accountInfo: undefined
      })
    } catch (e) {
      console.log(e)
      setAuthState({
        status: AuthStatus.Failure,
        error: e
      })
    }
  }, [accountInfo, msal.signOut])

  return React.useMemo(() => {
    console.log("recalculating AuthState memo, %o", authState)
    return {
      authState,
      accountInfo,
      handleRedirectPromise: handleRedirectPromiseCB,
      signIn: signInCB,
      signOut: signOutCB
    }
  }, [authState, accountInfo, handleRedirectPromiseCB, signInCB, signOutCB])
}
