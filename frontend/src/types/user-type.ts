export interface IUser {
  id: string;
  email: string | null;
  login: string | null;
  roleId: number;
  // session: string | null;
  registeredAt: string;
}
