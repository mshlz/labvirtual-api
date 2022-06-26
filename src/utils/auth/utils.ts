import { Role } from "./Role"

const AUTH_DATA_REQ_KEY = '__AUTH_DATA_REQ_KEY__'
type AuthData = {
    role: Exclude<keyof typeof Role, 'prototype'>
}

export function setAuthDataInReq(request, payload) {
    request[AUTH_DATA_REQ_KEY] = {
        role: payload.type
    }
}

export function getAuthDataFromReq(request): AuthData {
    return request[AUTH_DATA_REQ_KEY]
}
