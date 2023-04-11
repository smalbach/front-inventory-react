import * as Yup from 'yup'

import { Alert, Button, H3, Input } from 'components'
import React, {useEffect, useState} from 'react'

import Card from 'components/card'
import { CompanyModel } from 'modules/company/models/Company'
import {InventoryModel} from  'modules/inventory/models/Inventory'
import { Select } from 'components/Select'
import Swal from 'sweetalert2'
import { getCompanies } from 'modules/company/requests/_requests'
import { updateInventory } from 'modules/inventory/requests/_requests'
import {useFormik} from 'formik'

const InventorySchema = Yup.object().shape({
  company: Yup.string().required('Emprese es requerida'),
  name: Yup.string().required('Nombre del articulo es requerido'),
  quantity: Yup.number().positive().required('Cantidad es requerido'),
  value: Yup.number().positive().required('Valor es requerido'),
})


type Props = {
  inventory: InventoryModel
  setIsEditing: (value: boolean) => void
}

const UpdateInventory: React.FC<Props> = ({inventory, setIsEditing }) => {
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState<Array<CompanyModel>>([]);
  const formik = useFormik<InventoryModel>({
    initialValues:inventory,
    validationSchema: InventorySchema,
    onSubmit: async (values) => {
      const Inventory = await updateInventory(values as unknown as InventoryModel)
      if (Inventory) {
        setLoading(false)
        formik.resetForm()
        Swal.fire({
          title: 'Empresa actualizasa',
          text: 'La empresa ha sido actualizada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',

        })
        setIsEditing(false)
      }
    },
  })

  useEffect(() => {
    formik.setFieldValue('company', inventory.company.id)
    setLoading(true)
      getCompanies().then((res) => {
      setCompanies(res);
      setLoading(false)
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        Actualizar empresa
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="h-full w-full">
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='row mb-6'>
              <H3 className='col-lg-4 col-form-label required fw-bold fs-6 float-left'>
                Empresa
              </H3>

              <div className='col-lg-8 fv-row'>
                <Select
                  placeholder='Empresa'
                  {...formik.getFieldProps('company')}
                  value={formik.values.company.id}
                >
                  {companies.map((company) => (
                    <option
                      key={company.id} 
                      value={company.id}
                      selected={formik.values.company.id === company.id}
                    >
                      {company.name}
                    </option>
                  ))}
                </Select>
                {formik.touched.company && formik.errors.company && (
                  <Alert variant='danger'>{formik.errors.company.name}</Alert>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <H3 className='col-lg-4 col-form-label required fw-bold fs-6 float-left'>
                Nombre articulo
              </H3>

              <div className='col-lg-8 fv-row'>
                <Input
                  type='name'
                  placeholder='Nombre del articulo'
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name && (
                  <Alert variant='danger'>{formik.errors.name}</Alert>
                )}
              </div>
            </div>
              <>
                <div className='row mb-6'>
                  <H3 className='col-lg-4 col-form-label required fw-bold fs-6 float-left'>
                      Cantidad
                  </H3>

                  <div className='col-lg-8 fv-row'>
                    <Input
                      type='text'
                      placeholder='Cantidad'
                      {...formik.getFieldProps('quantity')}
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                      <Alert variant='danger'>{formik.errors.quantity}</Alert>
                    )}
                  </div>
                </div>
                <div className='row mb-6'>
                  <H3 className='col-lg-4 col-form-label required fw-bold fs-6 float-left'>
                    Valor
                  </H3>

                  <div className='col-lg-8 fv-row'>
                    <Input
                      type='text'
                      placeholder='Valor'
                      {...formik.getFieldProps('value')}
                    />
                    {formik.touched.value && formik.errors.value && (
                      <Alert variant='danger'>{formik.errors.value}</Alert>
                    )}
                  </div>
                </div>
                
                <Button type='submit' disabled={loading}>
                  {!loading && 'Guardar'}
                  {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Espere porfavor...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </Button>
                <br/>
                <Button 
                  className='bg-gray-300 hover:bg-gray-400 text-gray-800'
                  disabled={loading} 
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
              </>
          </form>
        </div>
      </div>
    </Card>
    </>
  )
}
  
  

export {UpdateInventory}
