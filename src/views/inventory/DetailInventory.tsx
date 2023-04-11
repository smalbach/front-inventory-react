import { FC, useContext, useEffect, useState } from 'react';
import { TableCell, TableRow } from 'components/Tables';

import { InventoryModel } from 'modules/inventory/models/Inventory';
import { RootStoreContext } from 'stores/rootStore';
import Swal from 'sweetalert2';
import { deleteInventory } from 'modules/inventory/requests/_requests';

interface Props {
  inventory: InventoryModel;
  setIsEditing: (value: boolean) => void;
  setInventory: (value: InventoryModel) => void;
}

 
const DetailInventory: FC<Props> = ({inventory, setIsEditing,setInventory}) => {
  const [canEdit, setCanEdit] = useState(false);
  const rootStore = useContext(RootStoreContext)
  const {user} = rootStore.authStore
   const { name, company, quantity, value } = inventory;

  useEffect(() => {
    if (user.role.name === "Admin") {
      setCanEdit(true)
    }
  },[user.role.name]);


  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteInventory(inventory)
        .then(() => {
          Swal.fire(
            'Eliminado!',
            'El articulo ha sido eliminado.',
            'success'
          )
        })
      }
    })
  }
  


  return (
      <TableRow>
        <TableCell>
          { name}
        </TableCell>
        <TableCell>
          {company?.name}
        </TableCell>
        <TableCell>
          {quantity}
        </TableCell>
        <TableCell>
          {value}
        </TableCell>
        {canEdit && (
          <TableCell> 
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() =>{
              setInventory(inventory)
              setIsEditing(true)
            }}
            >
            Editar
            </button>

          </TableCell>
        )}
        {canEdit && (
          <TableCell>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}
            >
              Eliminar
            </button>
          </TableCell>
        )}

      </TableRow>
  );
};

export default DetailInventory;