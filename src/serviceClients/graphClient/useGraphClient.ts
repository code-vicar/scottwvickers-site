import * as React from "react"
import { Client, AuthenticationProvider } from "@microsoft/microsoft-graph-client"
import { AuthContextType } from "../../contexts/auth/AuthContext"

const GRAPH_CLIENT_API_VERSION = "v1.0"
const GRAPH_CLIENT_API = "me/drive/special/approot"
const DEFAULT_GRAPH_SCOPES = ["Files.ReadWrite.AppFolder"]

interface IGraphClient {
  listFiles: () => Promise<unknown>
}

export const useGraphClient = (scopes: string[] = DEFAULT_GRAPH_SCOPES): IGraphClient => {
  const authContext = React.useContext(AuthContextType)

  const authProvider = React.useMemo((): AuthenticationProvider => {
    return {
      getAccessToken: (options) => authContext.getToken({ scopes: options?.scopes ?? scopes })
    }
  }, [authContext, scopes])

  const client = React.useMemo(() => Client.initWithMiddleware({ debugLogging: true, defaultVersion: GRAPH_CLIENT_API_VERSION, authProvider }), [
    authProvider
  ])

  const listFiles = React.useCallback(() => {
    const request = client.api(GRAPH_CLIENT_API)
    return request.get()
  }, [client])

  return {
    listFiles
  }
}
