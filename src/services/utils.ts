
export const pick = (obj: any, keys: string[]): {} =>
  keys.map(key => key in obj ? { [key]: obj[key] } : {}).reduce((res, obj) => Object.assign(res, obj), {})

/*export const pick2 = (obj: any, keys: string[]): {} => keys.map(key => {
  switch (typeof key) {
    case 'string':
      return key in obj ? { [key]: obj[key] } : {}
    case 'object'
      pick2(key, )
  }
})*/