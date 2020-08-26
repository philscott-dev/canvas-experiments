import humps from 'humps'

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function splitCamalized(string: string): string[] {
  return humps.decamelize(string).split('_')
}

export function splitAndCapitalize(string: string): string {
  return splitCamalized(string).map(capitalize).join(' ')
}

export function splitAndUpperCase(string: string): string {
  return humps
    .decamelize(string)
    .split('_')
    .map((string) => string.toUpperCase())
    .join(' ')
}
