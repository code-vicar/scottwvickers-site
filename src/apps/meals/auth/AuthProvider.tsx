import React from "react"
import { AuthContextType, useAuthState } from "../../../contexts"
import { saveUsername, loadUsername } from "../../../utils/authStorage"

export const AuthProvider: React.FC = ({ children }) => {
  const username = loadUsername()
  const authState = useAuthState(username)
  React.useEffect(() => {
    saveUsername(authState.username ? authState.username : undefined)
  }, [authState.username])

  return (
    <AuthContextType.Provider value={authState}>
      {children}
    </AuthContextType.Provider>
  )
}
