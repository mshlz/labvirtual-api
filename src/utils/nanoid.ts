import { customAlphabet } from 'nanoid'
import { customAlphabet as asyncCustomAlphabet } from 'nanoid/async'
const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export const getNanoId = (size?: number) => customAlphabet(ALPHABET, size || 7)()

export const getNanoIdAsync = async (size?: number) => asyncCustomAlphabet(ALPHABET, size || 7)()