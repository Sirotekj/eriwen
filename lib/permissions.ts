import { Role } from "@prisma/client";

type PermissionContext = {
  role?: Role;
  userId?: string;
  authorId?: string; // vlastník obsahu
};

export const permissions = {
  canCreate({ role }: PermissionContext) {
    return role === "ADMIN" || role === "EDITOR";
  },

  canEdit({ role, userId, authorId }: PermissionContext) {
    if (role === "ADMIN") return true;
    if (role === "EDITOR" && userId && authorId) {
      return userId === authorId;
    }
    return false;
  },

  canDelete({ role, userId, authorId }: PermissionContext) {
    return permissions.canEdit({ role, userId, authorId });
  },

  canChangeOrder({ role, userId, authorId }: PermissionContext) {
    return permissions.canEdit({ role, userId, authorId });
  },
};
