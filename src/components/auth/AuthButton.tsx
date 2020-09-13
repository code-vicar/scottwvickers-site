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
  return <span>Updating auth status...</span>
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
  const username = authContext.accountInfo ? authContext.accountInfo.username : undefined;
  console.log("Rendering authButton, %o", authContext.authState)
  if (authContext.authState.status === AuthStatus.Loading) {
    return <Loading />
  }
  if (authContext.authState.status === AuthStatus.Failure || !username) {
    return <SignIn onSignInClick={authContext.signIn} />
  }
  return <SignedIn username={username} onSignOutClick={authContext.signOut} />
}
