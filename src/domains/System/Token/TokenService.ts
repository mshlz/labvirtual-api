import { createHash } from 'crypto'
import { v4 } from 'uuid'
import { getNanoIdAsync } from '../../../utils/nanoid'
import { IToken, Token, TokenType } from './Token'

export class TokenService {
    public async createRaw(data: IToken) {
        const token = await Token.create(data)
        await token.save()
        return token
    }

    public async createNumberToken(type: TokenType, parentId: string, payload?: any, size?: number) {
        return this.createRaw({
            type,
            parentId,
            payload,
            token: await getNanoIdAsync(size || 6, { onlyNumbers: true })
        })
    }

    public async createUuidToken(type: TokenType, parentId: string, payload?: any) {
        return this.createRaw({
            type,
            parentId,
            payload,
            token: v4()
        })
    }

    public async createSha256Token(type: TokenType, parentId: string, payload?: any) {
        return this.createRaw({
            type,
            parentId,
            payload,
            token: createHash('SHA256').update(''.concat(type, parentId, v4())).digest('hex')
        })
    }

    public async use(token: string, type: TokenType, parentId?: string) {
        const result = await Token.findOne({ token, type, parentId })

        if (!result) {
            return null
        }

        await Token.deleteOne({ token, type, parentId })
        return result
    }

    public async delete(id: string) {
        return Token.deleteOne({ _id: id })
    }
}

export const tokenService = new TokenService()
