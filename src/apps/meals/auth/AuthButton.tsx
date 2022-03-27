import React from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import { AuthStatus } from "../../../interfaces"
import { AuthContextType } from "../../../contexts"

const Loading: React.FC = () => {
  return <span>Updating auth status...</span>
}

const SignedIn: React.FC<{
  username: string;
  onSignOutClick: () => void
}> = ({ username, onSignOutClick }) => {
  return (
    <Box sx={{
      alignItems: "center",
      display: "flex",
      gap: "5px"
    }}>
      <span>Hello {username}</span>
      <Button variant="contained" onClick={onSignOutClick} >Sign Out</Button>
    </Box>
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
  const username = authContext.username ? authContext.username : undefined
  console.log("Rendering authButton, %o", authContext.authState)
  if (authContext.authState.status === AuthStatus.Loading) {
    return <Loading />
  }
  if (!username) {
    return <SignIn onSignInClick={authContext.signIn} />
  }
  return <SignedIn username={username} onSignOutClick={authContext.signOut} />
}
