//with data array of objects  and the key generate new data array of objects with the same keys

const regenerateData = (data: any, colums: any) => {
  const newData = data.map((item: any) => {
    const newItem: any = {}
    colums.forEach((column: any) => {
      newItem[column] = item[column]
    })
    return newItem
  })
  return newData
}

export default regenerateData