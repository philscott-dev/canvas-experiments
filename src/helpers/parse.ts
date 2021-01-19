export function parseByNewline(string: string): string[] {
  return string.split(/\r?\n/)
}
