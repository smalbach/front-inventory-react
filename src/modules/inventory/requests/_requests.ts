import axios, { AxiosResponse } from "axios"

import { InventoryModel } from "../models/Inventory"

const API_URL = process.env.REACT_APP_API_URL
const INVENTORYS_URL = `${API_URL}/inventories`

const getInventoryByNIT = (nit: string): Promise<InventoryModel | undefined> => {
  return axios.post(`${INVENTORYS_URL}/searchByNIT`, {nit: nit}).then((response: AxiosResponse) => {
    return response.data as InventoryModel
  })
}


const getInventories = (): Promise<InventoryModel[] | undefined> => {
  return axios.get(`${INVENTORYS_URL}`).then((response: AxiosResponse) => {
    return response.data.data as InventoryModel[]
  })
}

const saveInventory = (inventory: InventoryModel): Promise<InventoryModel> => {
  return axios.post(`${INVENTORYS_URL}`, inventory).then((response: AxiosResponse) => {
    const frmval = response.data
    return frmval as InventoryModel
  })
}

const updateInventory = (inventory: InventoryModel): Promise<InventoryModel> => {
  return axios.put(`${INVENTORYS_URL}/${inventory.id}`, inventory).then((response: AxiosResponse) => {
    const frmval = response.data
    return frmval as InventoryModel
  })
}

const deleteInventory = (inventory: InventoryModel): Promise<InventoryModel> => {
  return axios.delete(`${INVENTORYS_URL}/${inventory.id}`).then((response: AxiosResponse) => {
    return response.data as InventoryModel
  })
}

const sendEmail = (email: string) => {
  return axios.post(`${INVENTORYS_URL}/sendEmail`, {email: email}).then((response: AxiosResponse) => {
    return response.data
  })
}


export {getInventoryByNIT,saveInventory,getInventories,updateInventory, deleteInventory, sendEmail}
