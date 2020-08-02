import React from "react"
import { IAuth, AuthState, AuthStatus } from "../../interfaces/IAuth"
import { signIn, signOut } from "../../microsoftGraph"

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
      const newSignIn = await signIn()
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
  }, [signIn])

  const signOutCB = React.useCallback(async () => {
    if (!username) {
      return
    }
    setAuthState({
      status: AuthStatus.Loading
    })
    try {
      await signOut(username)
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
  }, [signOut, username])

  return React.useMemo(() => ({
    authState,
    username,
    signIn: signInCB,
    signOut: signOutCB
  }), [signInCB, signOutCB])
}
