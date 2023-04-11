export interface CompanyModel {
  id: string
  name?: string
  address?: string
  nit?: string
  phone?: string
}

export const initialCompany: CompanyModel = {
  id: '',
  name: '',
  address: '',
  nit: '',
  phone: '',
}
