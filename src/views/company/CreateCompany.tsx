import * as Yup from 'yup'

import { Alert, Button, H3, Input } from 'components'
import {CompanyModel, initialCompany} from  'modules/company/models/Company'
import { getCompanyByNIT, saveCompany } from 'modules/company/requests/_requests'
import {useEffect, useState} from 'react'

import Card from 'components/card'
import Swal from 'sweetalert2'
import useDebounce from 'hooks/useDebounce/useDebounce'
import {useFormik} from 'formik'

const CompanySchema = Yup.object().shape({
  name: Yup.string().required('Nombre de la empresa es requerido'),
  address: Yup.string().required('Dirección es requerido'),
  nit: Yup.string().required('NIT es requerido'),
  phone: Yup.string().required('Teléfono es requerido'),
})

const CreateCompany = () => {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const formik = useFormik<CompanyModel>({
    initialValues: initialCompany,
    validationSchema: CompanySchema,
    onSubmit: async (values) => {
      const Company = await saveCompany(values as CompanyModel)

      if (Company) {
        Swal.fire({
          title: 'Empresa creada',
          text: 'La empresa ha sido creada correctamente',
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
    setSearchTerm(formik.values.nit)
  },[formik.values.nit]);


  useEffect(() => {
      if (debouncedSearchTerm) {
        setLoading(true);
        getCompanyByNIT(debouncedSearchTerm).then((results: any) => {
          if(results && results.id){
            formik.setFieldError('nit', 'El NIT ya existe');
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[debouncedSearchTerm]);


  return (
    <>
      <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        Crear empresa
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
                    NIT
                  </H3>

                  <div className='col-lg-8 fv-row'>
                    <Input
                      type='text'
                      placeholder='NIT'
                      {...formik.getFieldProps('nit')}
                    />
                    {formik.touched.nit && formik.errors.nit && (
                      <Alert variant='danger'>{formik.errors.nit}</Alert>
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

export {CreateCompany}
