import * as Yup from 'yup'

import { Alert, Button, H3, Input } from 'components'
import React, {useState} from 'react'

import Card from 'components/card'
import {CompanyModel} from  'modules/company/models/Company'
import Swal from 'sweetalert2'
import { updateCompany } from 'modules/company/requests/_requests'
import {useFormik} from 'formik'

const CompanySchema = Yup.object().shape({
  name: Yup.string().required('Nombre de la empresa es requerido'),
  address: Yup.string().required('Dirección es requerido'),
  phone: Yup.string().required('Teléfono es requerido'),
})


type Props = {
  company: CompanyModel
  setIsEditing: (value: boolean) => void
}

const UpdateCompany: React.FC<Props> = ({company, setIsEditing }) => {
  const [loading, setLoading] = useState(false)
  const formik = useFormik<CompanyModel>({
    initialValues: company,
    validationSchema: CompanySchema,
    onSubmit: async (values) => {
      const Company = await updateCompany(values as CompanyModel)
      if (Company) {
        setLoading(false)
        formik.resetForm()
        Swal.fire({
          title: 'Empresa actualizada',
          text: 'La empresa ha sido actualizada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',

        })
        setIsEditing(false)
      }
    },
  })

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
                Nombre de la empresa
              </H3>

              <div className='col-lg-8 fv-row'>
                <Input
                  type='name'
                  placeholder='Nombre de la empresa'
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
                      Dirección
                  </H3>

                  <div className='col-lg-8 fv-row'>
                    <Input
                      type='text'
                      placeholder='Dirección'
                      {...formik.getFieldProps('address')}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <Alert variant='danger'>{formik.errors.address}</Alert>
                    )}
                  </div>
                </div>

                <div className='row mb-6'>
                  <H3 className='col-lg-4 col-form-label required fw-bold fs-6 float-left'>
                    Tléfono
                  </H3>

                  <div className='col-lg-8 fv-row'>
                    <Input
                      type='text'
                      placeholder='Télefono'
                      {...formik.getFieldProps('phone')}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <Alert variant='danger'>{formik.errors.phone}</Alert>
                    )}
                  </div>
                </div>
                <Button type='submit' disabled={loading}>
                  {!loading && 'Actualizar'}
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

export {UpdateCompany}
