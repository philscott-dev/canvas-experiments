import fetch from 'isomorphic-unfetch'
import querystring from 'querystring'

/**
 * Base Fetcher
 */

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const baseUrl = 'http://localhost:3001/api'

export default async function fetcher(
  method: Method,
  endpoint: string,
  query?: { [key: string]: any },
  body?: { [key: string]: any },
) {
  try {
    // stringify query and call api
    const params = querystring.stringify(query)
    const res = await fetch(
      `${baseUrl}${endpoint}${params ? '?' + params : ''}`,
      {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    // check for errors
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    // await json
    const json = await res.json()
    return json
  } catch (err) {
    // catch errors
    console.log(err.statusCode)
    throw new Error(err)
  }
}

/**
 * Services
 */

export const postPythonScript = (script: string) =>
  fetcher(Method.POST, '/python', undefined, { script })
