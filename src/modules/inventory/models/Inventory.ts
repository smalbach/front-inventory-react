import { CompanyModel } from "modules/company/models/Company";

export interface InventoryModel {
  id: string
  company?: CompanyModel;
  name?: string
  quantity?: number
  value?: number
}


export interface InventoryModelForm {
  id: string
  company?: string;
  name?: string
  quantity?: number
  value?: number
}


export const initialInventory: InventoryModelForm = {
  id: '',
  name: '',
  quantity: 0,
  value: 0,
}
