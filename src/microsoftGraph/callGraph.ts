export class GraphError extends Error {
  response?: Response

  constructor(message: string, response?: Response) {
    super(message)
    this.response = response
  }
}

export interface IGraphResponse {
  response: Response
  endpoint: string
  json: Record<string, unknown>
}

// Helper function to call MS Graph API endpoint
// using authorization bearer token scheme
export async function callMSGraph(
  endpoint: string,
  token: string
): Promise<IGraphResponse> {
  const headers = new Headers()
  const bearer = `Bearer ${token}`

  headers.append("Authorization", bearer)

  const options = {
    method: "GET",
    headers: headers
  }

  console.log("request made to Graph API at: " + new Date().toString())
  let response: Response
  try {
    response = await fetch(endpoint, options)
  } catch (e) {
    throw new GraphError(e.message)
  }
  if (!response.ok) {
    throw new GraphError(response.statusText, response)
  }
  return {
    response,
    json: await response.json(),
    endpoint
  }
}
