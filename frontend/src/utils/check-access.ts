export const checkAccess = (access: number[], userRole: number) =>
  access.includes(userRole);
