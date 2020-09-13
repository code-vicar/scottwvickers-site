import { LogLevel, Configuration } from "@azure/msal-browser"

import { isIE } from "../../utils/isIE"

// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters,
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
export const msalConfig: Configuration = {
  auth: {
    clientId: "c128ff80-10ac-4985-9b0f-f807473ce4eb",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: `${process.env.MSAL_REDIRECT_URI}`,
    postLogoutRedirectUri: `${process.env.MSAL_POST_LOGOUT_REDIRECT_URI}`
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: isIE()
  },
  system: {
    loggerOptions: {
      piiLoggingEnabled: false,
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ): void => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
        }
      }
    }
  }
}

// Add here the scopes that you would like the user to consent during sign-in
export const signInScopes: Array<string> = ["User.Read"]
