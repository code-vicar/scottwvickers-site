import { AccountInfo, LogLevel, Configuration } from "@azure/msal-browser"
import { BaseAuthRequest, SilentFlowRequest } from "@azure/msal-common"

import { isIE } from "../utils/isIE"

// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters,
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
export const msalConfig: Configuration = {
  auth: {
    clientId: "c128ff80-10ac-4985-9b0f-f807473ce4eb",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: `${process.env.MSAL_REDIRECT_URI}`
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: isIE()
  },
  system: {
    loggerOptions: {
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
export const loginRequest: BaseAuthRequest = {
  scopes: ["User.Read"]
}

export type CustomTokenRequest = Omit<SilentFlowRequest, "account"> & {
  account?: AccountInfo
}

// Add here the scopes to request when obtaining an access token for MS Graph API
export const tokenRequest: CustomTokenRequest = {
  scopes: ["Files.ReadWrite.AppFolder"],
  forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
}
