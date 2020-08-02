import React from "react"

import { Button } from "@material-ui/core"
import { signIn, signOut, isSignedIn } from "../../microsoftGraph"

enum AuthStatus {
  Loading,
  Ready,
  Failure,
}

interface ILoading {
  status: AuthStatus.Loading;
}

interface IReady<T> {
  status: AuthStatus.Ready;
  data: T;
}

interface IFailure<E> {
  status: AuthStatus.Failure;
  error: E;
}

type AuthState<T, E> = ILoading | IReady<T> | IFailure<E>;

const Loading: React.FC = () => {
  return <span>Signing in</span>
}

const SignedIn: React.FC<{
  username: string;
  onSignOutClick: () => void
}> = ({ username, onSignOutClick }) => {
  return (
    <div>
      <span>Hello {username}</span>
      <Button variant="contained" onClick={onSignOutClick} >Sign Out</Button>
    </div>
  )
}

const SignIn: React.FC<{ onSignInClick: () => Promise<void> }> = ({ onSignInClick }) => {
  return (
    <Button variant='contained' color='primary' onClick={onSignInClick}>
      Sign In
    </Button>
  )
}

export const AuthButton: React.FC = () => {
  const info = isSignedIn()

  const [state, setState] = React.useState<{
    authState: AuthState<string | undefined, Error>;
  }>({ authState: { status: AuthStatus.Ready, data: undefined } })

  React.useEffect(() => {
    setState({
      authState: {
        status: AuthStatus.Ready,
        data: info?.username
      }
    })
  }, [info?.username])

  const signInCB = React.useCallback(async () => {
    setState({
      authState: {
        status: AuthStatus.Loading
      }
    })
    try {
      const newSignIn = await signIn()
      setState({
        authState: {
          status: AuthStatus.Ready,
          data: newSignIn.account.username
        }
      })
    } catch (e) {
      console.log(e)
      setState({
        authState: {
          status: AuthStatus.Failure,
          error: e
        }
      })
    }
  }, [signIn])

  const signOutCB = React.useCallback(async () => {
    setState({
      authState: {
        status: AuthStatus.Loading
      }
    })
    try {
      await signOut()
      setState({
        authState: {
          status: AuthStatus.Ready,
          data: undefined
        }
      })
    } catch (e) {
      console.log(e)
      setState({
        authState: {
          status: AuthStatus.Failure,
          error: e
        }
      })
    }
  }, [signIn])

  if (state.authState.status === AuthStatus.Loading) {
    return <Loading />
  }
  if (state.authState.status === AuthStatus.Failure || !state.authState.data) {
    return <SignIn onSignInClick={signInCB} />
  }
  return <SignedIn username={state.authState.data} onSignOutClick={signOutCB} />
}
