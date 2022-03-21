
import { AccountInfo, AuthenticationResult } from "@azure/msal-browser"
import { isSSR } from "../../utils"
interface IMSAL {
  handleRedirectPromise(): Promise<AuthenticationResult | undefined>
  getAccountByUsername: (username: string) => AccountInfo | undefined
  getTokenSilent: (username: string, scopes: string[]) => Promise<AuthenticationResult>
  signIn: () => Promise<AuthenticationResult>
  signOut: (account: AccountInfo) => Promise<void>
}

function initMSAL(): IMSAL {
  if (isSSR()) {
    return {
      handleRedirectPromise: (): Promise<undefined> => Promise.resolve(undefined),
      getAccountByUsername: (): undefined => undefined,
      getTokenSilent: (): Promise<AuthenticationResult> => Promise.resolve(({} as unknown) as AuthenticationResult),
      signIn: (): Promise<AuthenticationResult> => Promise.resolve(({} as unknown) as AuthenticationResult),
      signOut: (): Promise<void> => Promise.resolve()
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const actualMsal: IMSAL = require("./_auth")
    return {
      handleRedirectPromise: actualMsal.handleRedirectPromise,
      getAccountByUsername: actualMsal.getAccountByUsername,
      getTokenSilent: actualMsal.getTokenSilent,
      signIn: actualMsal.signIn,
      signOut: actualMsal.signOut
    }
  }
}

const msal = initMSAL()

export { msal }
