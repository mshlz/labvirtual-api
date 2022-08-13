import { createHash } from 'crypto'
import { v4 } from 'uuid'
import { BadRequestError } from '../../utils/http/responses'
import { getNanoIdAsync } from '../../utils/nanoid'
import { IToken, Token, TokenType } from './Token'

export class TokenService {
    public async createRaw(data: IToken) {
        const token = await Token.create(data)
        await token.save()
        return token
    }

    public async createToken(type: TokenType, token: string, parentId: string, payload?: any, expireAt?: Date) {
        return this.createRaw({
            type,
            parentId,
            payload,
            token,
            expireAt,
        })
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

    public async use(tokenId: string, token: string, type: TokenType, parentId?: string) {
        const params = {
            _id: tokenId, 
            token, 
            type, 
            parentId
        }
        
        if (!parentId) delete params.parentId

        const result = await Token.findOne(params)

        if (!result) {
            return null
        }

        if (result.expireAt && new Date(result.expireAt).getTime() < Date.now()) {
            await result.delete()
            throw new BadRequestError("Token expired")
        }

        await Token.deleteOne({ _id: tokenId })
        return result
    }

    public async check(id: string, code: string) {
        const token = await Token.findById(id)

        if (!token || token.token != code)
            return false

        return true
    }

    public async findOne(type: TokenType, parentId: string, includeExpired?: boolean) {
        const filter = {
            type,
            parentId,
            expireAt: {
                $gt: new Date()
            }
        }

        if (includeExpired) {
            delete filter.expireAt
        }

        return Token.findOne(filter)
    }

    public async delete(id: string) {
        return Token.deleteOne({ _id: id })
    }
}

export const tokenService = new TokenService()
