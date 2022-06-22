
/**
 * Remove unneeded keys and values
 * @param key string | string[]
 * @param obj Object
 * @returns Object
 */
export const omit = <Key extends keyof T, T = {}>(keys: Key | Key[] = [], obj: T) => {
  let o = {};
  if (keys instanceof Array) {
    Object.keys(obj).forEach((_key: string, index) => {
      const _k: string = String(_key);
      if (!((keys as string[]).includes(_k))) {
        o[_k] = obj[_k];
      }
    })
    return o;
  }
  const { [keys]: omitted, ...rest } = obj;
  return rest;
}


export const getPrefix = (name: string) => 'alpha-' + name; 