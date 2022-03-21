import React from "react"
import { navigate } from "gatsby"
import { isSSR } from "../utils"
import { msal } from "../serviceClients/msal"

const AuthLanding: React.FC = () => {
  if (isSSR()) {
    return null
  }
  msal.handleRedirectPromise().catch((err) => {
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
