
export enum RoleEnum {
  'admin' = 1,
  'user' = 2,
}

interface Role {
  id: number
  name: string
}

export interface UserModel {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  role?: Role

}

export const initialUser: UserModel = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
}
