import { model, Schema } from 'mongoose'

export const TokenTypeArray = ['ACCOUNT_CONFIRM'] as const
export type TokenType = typeof TokenTypeArray[number]

export interface IToken {
    token: string
    parentId: string
    type: TokenType
    payload?: any
}

const TokenSchema = new Schema<IToken>({
    token: { type: String, required: true, index: true },
    parentId: { type: String, required: true },
    type: { type: String, enum: TokenTypeArray },
    payload: { type: Object },
}, { versionKey: false, timestamps: { createdAt: true, updatedAt: false } })

export const Token = model<IToken>('Token', TokenSchema)
