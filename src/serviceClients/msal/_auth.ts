
import {
  AccountInfo,
  AuthenticationResult,
  PublicClientApplication,
  InteractionRequiredAuthError
} from "@azure/msal-browser"

import { msalConfig, signInScopes } from "./msalConfig"

const msal = new PublicClientApplication(msalConfig)

export async function handleRedirectPromise(): Promise<AuthenticationResult | undefined> {
  return msal.handleRedirectPromise().then((result) => {
    console.log("handle redirect resolved", result)
    return result ?? undefined
  }).catch(err => {
    console.log("Err in handleRedirectPromise", err)
    throw err
  })
}

export function getAccountByUsername(username: string): AccountInfo | undefined {
  return msal.getAccountByUsername(username) ?? undefined
}

export async function signIn(): Promise<AuthenticationResult> {
  const response = await msal.loginPopup({ scopes: signInScopes })
  if (!response) {
    throw new Error("did not login")
  }
  return response
}

export async function signOut(account: AccountInfo): Promise<void> {
  const logoutRequest = {
    account
  }
  console.log("Signout request", logoutRequest)
  return msal.logoutPopup(logoutRequest)
}

export async function getTokenSilent(
  username: string,
  scopes: string[]
): Promise<AuthenticationResult> {
  /**
   * See here for more info on account retrieval:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  const account = msal.getAccountByUsername(username)
  if (!account) {
    throw new Error("not logged in")
  }
  let silentFetchError: unknown
  try {
    return await msal.acquireTokenSilent({
      scopes,
      account,
      forceRefresh: false
    })
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
  return await msal.acquireTokenPopup({
    scopes
  })
}
