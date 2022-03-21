import React from "react"
import { IAuth, IAuthTokenOptions, AuthState, AuthStatus } from "../../interfaces/IAuth"
import { msal } from "../../serviceClients/msal"

export const useAuthState: (initialUsername?: string) => IAuth = (initialUsername) => {
  const [authState, setAuthState] = React.useState<AuthState>({
    status: AuthStatus.Ready,
    username: initialUsername
  })

  const username = React.useMemo(() => {
    if (authState.status !== AuthStatus.Ready) {
      return undefined
    }
    const account = authState.username ? msal.getAccountByUsername(authState.username) : null
    return account ? account.username : undefined
  }, [authState])

  const signInCB = React.useCallback(async () => {
    console.log("signIn - AuthStatus Loading")
    setAuthState({
      status: AuthStatus.Loading
    })
    try {
      const signedIn = await msal.signIn()
      if (!signedIn.account) {
        console.log("signIn - AuthStatus Failure: no account found")
        setAuthState({
          status: AuthStatus.Failure,
          error: new Error("no account info found")
        })
      } else {
        console.log("signIn - AuthStatus Ready: signed in")
        setAuthState({
          status: AuthStatus.Ready,
          username: signedIn.account.username
        })
      }
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
    const account = msal.getAccountByUsername(username)
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
    return username ? msal.getAccountByUsername(username) : undefined
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
