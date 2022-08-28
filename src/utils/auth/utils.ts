import { ForbiddenError, UnauthorizedError } from "routing-controllers";
import { Role, Roles } from "./Role";

const AUTH_DATA_REQ_KEY = "__AUTH_DATA_REQ_KEY__";
type AuthData = {
  role: Roles;
};

export function setAuthDataInReq(request, payload) {
  request[AUTH_DATA_REQ_KEY] = {
    role: payload.permission?.role || payload.type,
  };
}

export function getAuthDataFromReq(request): AuthData {
  return request[AUTH_DATA_REQ_KEY];
}

export const getRoleFromName = (name: Roles) => Role[name];

const atLeast = (baseRole: Role) => (compareRole: Role | Roles) =>
  (typeof compareRole === "string" ? getRoleFromName(compareRole) : compareRole)
    .level >= baseRole.level;

export const isRoot = atLeast(Role.ROOT);

export const checkOwnership = (role: Role | Roles, block: () => boolean) => {
  if (!(isRoot(role) || block())) {
    throw new ForbiddenError("Sem permissão");
  }
};
