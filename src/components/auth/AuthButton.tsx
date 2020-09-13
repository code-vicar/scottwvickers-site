import React from "react"

import { Button, createStyles, makeStyles } from "@material-ui/core"

import { AuthStatus } from "../../interfaces"
import { AuthContextType } from "../../contexts"

const useSignedInStyles = makeStyles(() =>
  createStyles({
    root: {
      alignItems: "center",
      display: "flex",
      gap: "5px"
    }
  })
)

const Loading: React.FC = () => {
  return <span>Signing in</span>
}

const SignedIn: React.FC<{
  username: string;
  onSignOutClick: () => void
}> = ({ username, onSignOutClick }) => {
  const styles = useSignedInStyles()
  return (
    <div className={styles.root}>
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
  const authContext = React.useContext(AuthContextType)

  if (authContext.authState.status === AuthStatus.Loading) {
    return <Loading />
  }
  if (authContext.authState.status === AuthStatus.Failure || !authContext.username) {
    return <SignIn onSignInClick={authContext.signIn} />
  }
  return <SignedIn username={authContext.username} onSignOutClick={authContext.signOut} />
}
