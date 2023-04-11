import * as Yup from 'yup'

import { Alert, Button, Input } from 'components';
import { Table, TableBody, TableHead, TableHeaders, TableRow } from 'components/Tables';
import { getInventories, sendEmail } from 'modules/inventory/requests/_requests';
import { useEffect, useState } from 'react';

import Card from 'components/card';
import DetailInventory from './DetailInventory';
import { InventoryModel } from 'modules/inventory/models/Inventory';
import Swal from 'sweetalert2';
import { UpdateInventory } from './UpdateInventory';
import convertDataInventory from 'modules/company/utils/convertDataInventory';
import downloadTablePDF from 'core/utils/downloadTablePDF';
import {useFormik} from 'formik'

const emailSchema = Yup.object().shape({
  email: Yup.string().email().required('Emprese es requerida'),
  
})



const ListInventory = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [inventories, setInventories] = useState<Array<InventoryModel>>([]);
  const [inventory, setInventory] = useState<InventoryModel>(null);
  
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
    onSubmit: async (values) => {
      sendEmail(values.email);
      formik.resetForm();
      Swal.fire({ 
        title: 'Correo enviado',
        text: 'Correo enviado',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      })
      
    },
  })
  
  useEffect(() => {
    if(!isEditing){
      getInventories().then((res: InventoryModel[]) => {
        setInventories(res);
      });
    }
  },[isEditing]);

  if(isEditing) {
    return <UpdateInventory inventory={inventory} setIsEditing={setIsEditing} />
  }

   
  return (
    <div>
      <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        Listar articulos
      </div>
      {/* generte button to download pnd */}


      <Button
        onClick={() => 
          downloadTablePDF(
            convertDataInventory(inventories), ['Nombre', 'Empresa', 'Cantidad', 'valor' ]
          )
        }
      >Descargar pdf</Button>

     
      <br/>
      <div className="flex justify-between">
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <Input
          type='email'
            placeholder='Correo'
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <Alert variant='danger'>{formik.errors.email}</Alert>
          )}
          <Button  type='submit'  >Enviar por correo</Button>

        </form>

      </div>
      <br/>
      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaders>
                Nombre
              </TableHeaders>
              <TableHeaders>
                Empresa
              </TableHeaders>
              <TableHeaders>
                Cantidad
              </TableHeaders>
              <TableHeaders>
                Valor
              </TableHeaders>
              <TableHeaders>
              </TableHeaders>
              <TableHeaders>
              </TableHeaders>
            </TableRow>
          </TableHead>

          <TableBody>

          {inventories && inventories.map((inventory) => (
            <DetailInventory
              inventory={inventory}
              setIsEditing={setIsEditing}
              setInventory={setInventory}
              key={inventory.id}  />
          ))}
          </TableBody>
        </Table>

      </div>
    </Card>
    </div>
  );
};

export default ListInventory;