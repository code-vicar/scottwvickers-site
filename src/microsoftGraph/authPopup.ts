// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
import {
  AccountInfo,
  AuthenticationResult,
  PublicClientApplication,
  InteractionRequiredAuthError
} from "@azure/msal-browser"
import { SilentFlowRequest } from "@azure/msal-common"

import { msalConfig, loginRequest, CustomTokenRequest } from "./msalConfig"

const myMSALObj = new PublicClientApplication(msalConfig)

let username = ""

export async function signIn(): Promise<AuthenticationResult> {
  const response = await myMSALObj.loginPopup(loginRequest)
  if (!response) {
    throw new Error("did not login")
  }
  username = response.account.username
  return response
}

export async function signOut(): Promise<void> {
  const logoutRequest = {
    account: myMSALObj.getAccountByUsername(username)
  }

  return myMSALObj.logout(logoutRequest)
}

export const isSignedIn: () => AccountInfo | undefined = () => {
  const info = myMSALObj.getAccountByUsername(username)
  if (!info) {
    return undefined
  }
  return info
}

export async function getTokenPopup(
  request: CustomTokenRequest
): Promise<AuthenticationResult> {
  /**
   * See here for more info on account retrieval:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  const account = myMSALObj.getAccountByUsername(username)
  if (!account) {
    throw new Error("not logged in")
  }
  const req: SilentFlowRequest = {
    ...request,
    account
  }
  let silentFetchError: Error | undefined
  try {
    return await myMSALObj.acquireTokenSilent(req)
  } catch (error) {
    console.warn(
      "silent token acquisition fails. acquiring token using redirect"
    )
    silentFetchError = error
  }
  if (!(silentFetchError instanceof InteractionRequiredAuthError)) {
    throw silentFetchError
  }

  // fallback to interaction when silent call fails
  return await myMSALObj.acquireTokenPopup(request)
}
