import { Client, AuthProvider } from "@microsoft/microsoft-graph-client"

import { IGraphClientContexts } from "./IGraphClient"

export class GraphClient {
  private scopes = ["Files.ReadWrite.AppFolder"]
  private contexts: IGraphClientContexts;

  constructor(contexts: IGraphClientContexts) {
    this.contexts = contexts
  }

  async listFiles(): Promise<unknown> {
    const client = this.getClient()
    const request = client.api("me/drive/special/approot")
    return request.get()
  }

  private getClient(): Client {
    return Client.init({ debugLogging: true, defaultVersion: "v1.0", authProvider: this.getAuthProvider() })
  }

  private getAuthProvider(): AuthProvider {
    return async (done) => {
      try {
        const token = await this.contexts.authContext.getToken({ scopes: this.scopes })
        done(null, token)
      } catch (err) {
        done(err, null)
      }
    }
  }
}
