import * as Yup from 'yup'

import { Alert, Button, H3, Input } from 'components'
import {InventoryModel, initialInventory} from  'modules/inventory/models/Inventory'
import React, {useEffect, useState} from 'react'

import Card from 'components/card'
import { CompanyModel } from 'modules/company/models/Company'
import { Select } from 'components/Select'
import Swal from 'sweetalert2'
import { getCompanies } from 'modules/company/requests/_requests'
import { saveInventory } from 'modules/inventory/requests/_requests'
import {useFormik} from 'formik'

const InventorySchema = Yup.object().shape({
  company: Yup.string().required('Emprese es requerida'),
  name: Yup.string().required('Nombre del articulo es requerido'),
  quantity: Yup.number().positive().required('Cantidad es requerido'),
  value: Yup.number().positive().required('Valor es requerido'),
})




const CreateInventory= () => {
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState<Array<CompanyModel>>([]);

  const formik = useFormik<InventoryModel>({
    initialValues: initialInventory,
    validationSchema: InventorySchema,
    onSubmit: async (values) => {
      const Inventory = await saveInventory(values as InventoryModel)

      if (Inventory) {
        Swal.fire({
          title: 'Empresa creada',
          text: 'Articulo creado',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        })

        formik.resetForm()
      }
      setLoading(true)
      setLoading(false)
    },
  })

  useEffect(() => {
    setLoading(true)
      getCompanies().then((res) => {
      setCompanies(res);
      setLoading(false)
    });
  },[]);

  return (
    <>
      <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        Crear articulo de inventario
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
                >
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
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
                {formik.values.name && (
                  <>
                    <div className='row mb-6'>
                      <H3 className='col-lg-4 col-form-label required fw-bold fs-6'></H3>

                      <div className='col-lg-8 fv-row'>
                        {`${formik.values.name}`}
                      </div>
                    </div>
                  </>
                )}
              </>
          </form>
        </div>
      </div>
    </Card>
    </>
  )
}

export {CreateInventory}
