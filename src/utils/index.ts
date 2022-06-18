
/**
 * Remove unneeded keys and values
 * @param key string | string[]
 * @param obj Object
 * @returns Object
 */
export const omit = <Key extends keyof T, T = {}>(key: Key | Key[] = [], obj: T) => {
    let o :T;
    if (key instanceof Array) {
        const keys = Object.keys(obj);
        for (let i = 0; i < key.length; i++) {
            const k: Key = key[i];
            if (!keys.includes(String(k))) {
                o[k] = obj[k]; 
            }
        }
        return o;
    }
    const { [key]: omitted, ...rest } = obj;
    return rest;
}