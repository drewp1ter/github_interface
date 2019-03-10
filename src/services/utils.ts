export const pick = (obj: any, keys: string[]): {} =>
  keys.map(key => (key in obj ? { [key]: obj[key] } : {})).reduce((res, obj) => Object.assign(res, obj), {})
