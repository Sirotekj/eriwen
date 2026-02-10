import { Role } from "@prisma/client";

export function getEditMode(role: Role | undefined, editModeParam: boolean) {
  const canEdit = role === "ADMIN" || role === "EDITOR";

  return {
    canEdit,
    editMode: editModeParam,
    isEditing: canEdit && editModeParam,
  };
}
