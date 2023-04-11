import { FC, useContext, useEffect, useState } from 'react';
import { TableCell, TableRow } from 'components/Tables';

import { CompanyModel } from 'modules/company/models/Company';
import { RootStoreContext } from 'stores/rootStore';
import Swal from 'sweetalert2';
import { deleteCompany } from 'modules/company/requests/_requests';

interface Props {
  company: CompanyModel;
  setIsEditing: (value: boolean) => void;
  setCompany: (value: CompanyModel) => void;
  setReload: (value: boolean) => void;
}

 
const DetailCompany: FC<Props> = ({company, setIsEditing,setCompany,setReload}) => {
  const [canEdit, setCanEdit] = useState(false);
  const rootStore = useContext(RootStoreContext)
  const {user} = rootStore.authStore
  const {name, address, nit, phone} = company;

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
        deleteCompany(company)
        .then(() => {
          setReload(true)
          Swal.fire(
            'Eliminado!',
            'La compañía ha sido eliminada.',
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
          {address}
        </TableCell>
        <TableCell>
          {nit}
        </TableCell>
        <TableCell>
          {phone}
        </TableCell>
        {canEdit && (
          <TableCell> 
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() =>{
              setCompany(company)
              setIsEditing(true)
            }}
            >
            Editar
            </button>

          </TableCell>
        )}
        {canEdit && (
          <TableCell>
            <button 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </TableCell>
        )}

      </TableRow>
  );
};

export default DetailCompany;