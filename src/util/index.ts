// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNormalJSON = (data: any) => {
  try {
    if (
      typeof data === 'number' ||
      data === null ||
      typeof data === 'boolean' ||
      typeof data === 'bigint'
    ) {
      return false
    }
    JSON.parse(data)
  } catch {
    return false
  }
  return true
}
