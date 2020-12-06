import querystring, { ParsedUrlQueryInput } from 'querystring'

interface PathOptions {
  pathname: string
  params?: ParsedUrlQueryInput
}

interface UrlOptions {
  baseUrl: string
  query?: ParsedUrlQueryInput
  path?: string | PathOptions
}

export const buildPathname = (
  pathname: string,
  params?: ParsedUrlQueryInput,
) => {
  if (!params) {
    return pathname
  }
  return Object.keys(params).reduce(
    (acc, param) => acc.replace(param, String(params[param])),
    pathname,
  )
}

export const buildUrl = ({ baseUrl, query, path }: UrlOptions) => {
  let fullUrl = new URL(baseUrl)

  if (path) {
    const pathname =
      typeof path === 'string'
        ? path
        : buildPathname(path.pathname, path.params)
    fullUrl = new URL(pathname, fullUrl)
  }

  if (query) {
    fullUrl = new URL('?' + querystring.stringify(query), fullUrl)
  }

  return fullUrl.toString()
}
