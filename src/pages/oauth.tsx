import React from "react"
import { navigate } from "gatsby"
// import { useAuthState } from "../contexts/auth/useAuthState"
import { isSSR } from "../utils"
const AuthLanding: React.FC = () => {
  if (isSSR()) {
    return null
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { handleRedirectPromise } = require("../serviceClients/msal")
  handleRedirectPromise().catch((err: unknown) => {
    console.log(err)
  }).then(() => {
    if (window !== window.parent && !window.opener) {
      return
    }
    navigate("/meals/", { replace: true })
  })
  return (<div></div>)
}
export default AuthLanding
