import { InventoryModel } from "../../inventory/models/Inventory"

const convertDataInventory = (data: InventoryModel[]) => {
  const newData = data.map((item: any) => {
    const newItem: any = {}
    newItem.name = item.name
    newItem.company = item.company.name
    newItem.quantity = item.quantity
    newItem.value = item.value
    
    return newItem
  })
  return newData
}

export default convertDataInventory