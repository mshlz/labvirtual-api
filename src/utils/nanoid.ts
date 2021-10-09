import { customAlphabet } from 'nanoid'
const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export const getNanoId = (size?: number) => customAlphabet(ALPHABET, size || 7)()