export function escapeStringRegexp(value: string): string {
    if (typeof value !== 'string') {
        throw new TypeError('Expected a string')
    }

    return value
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d')
}

export const isNull = (value: any) => value === null
export const isUndefined = (value: any) => typeof value === 'undefined'
export const isNullOrUndefined = (value: any) => typeof value === 'undefined' || value === null