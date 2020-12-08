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

export const buildPathname = ({ pathname, params }: PathOptions) => {
  if (!params) {
    return pathname
  }
  return Object.keys(params).reduce(
    (acc, param) => acc.replace(`:${param}`, String(params[param])),
    pathname,
  )
}

export const buildUrl = ({ baseUrl, query, path }: UrlOptions) => {
  let fullUrl = new URL(baseUrl)

  if (path) {
    const pathname = typeof path === 'string' ? path : buildPathname(path)
    fullUrl = new URL(pathname, fullUrl)
  }

  if (query) {
    fullUrl = new URL('?' + querystring.stringify(query), fullUrl)
  }

  return fullUrl
}

/**
apimanagerService(id: 1) {
  paramsQuery: []
  paramsPath: []
  paramsBody: []
  paramsHeader: []
  paramsCookie: []
}
apimanagerRoute(id: 1) {
  name - displayName
  route - route template
  method - GET
  nameSlug - SAM ui slug - could dynamically build doc links with this
  paramsQuery: []
  paramsPath: []
  paramsBody: []
  paramsHeader: []
  paramsCookie: []
}

 */

// :optional? - route
export const parseUrl = (urlString: string) => {
  const url = new URL(urlString)
  const path = url.pathname.split('/')
  const query = querystring.parse(url.search.split('?')[1])
  const params = path
    .filter((param) => param.charAt(0) === ':')
    .map((s) => s.substring(1))
  return { url, params, query }
}