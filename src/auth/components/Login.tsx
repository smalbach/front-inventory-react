import * as Yup from 'yup'

import {Alert, Button, H1, H3, H4, Input, Link, P} from 'components'
import { Navigate, Route, Routes } from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'

import {ErrorParser} from 'core/error/utils/ErrorParser'
import {RootStoreContext} from 'stores/rootStore'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import {useFormik} from 'formik'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const user_dev_test = process.env.REACT_APP_TEMP_DEV_USER_MAIL || ''
const user_dev_test_pass = process.env.REACT_APP_TEMP_DEV_MAIL_PASS || ''

const initialValues = {
  email: user_dev_test,
  password: user_dev_test_pass,
}

const Login = () => {
  const [loading, setLoading] = useState(false)
  const rootStore = useContext(RootStoreContext)
  const {loginUser, onErrorLogin} = rootStore.authStore

  useEffect(() => {
    if (onErrorLogin) {
      setLoading(false)
      formik.setStatus(ErrorParser(onErrorLogin.errors))
      formik.setSubmitting(false)
    }
    // eslint-disable-next-line
  }, [onErrorLogin])

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values: { email: string; password: string }, {setStatus, setSubmitting}: any) => {
      setLoading(true)
      setSubmitting(true)
      setStatus('')
      loginUser(values.email, values.password)
    },
  })

  return (
    <form className='' onSubmit={formik.handleSubmit} noValidate id='kt_login_signin_form'>

      <section className=''>
        <H1>Welcome back</H1>
      </section>
      <section className=''>
        <H3>Email address</H3>
        <Input
          className=''
          placeholder='Email'
          {...formik.getFieldProps('email')}
          type='email'
          name='email'
        />
        {formik.touched.email && formik.errors.email && (
          <div className=''>
            <span role='alert' className=''>
              <Alert>{formik.errors.email}</Alert>
            </span>
          </div>
        )}
      </section>
      <section>
        <H3>Password</H3>
        <Input
          type='password'
          autoComplete='off'
          placeholder='Password'
          {...formik.getFieldProps('password')}
          className={clsx(
            '',
            {
              'is-invalid': <Alert>formik.touched.password && formik.errors.password,</Alert>,
            },
            {
              'is-valid': <Alert>formik.touched.password && !formik.errors.password,</Alert>,
            }
          )}
        />

        <Alert>
          {formik.touched.password && formik.errors.password && (
            <div className=''>
              <div className=''>
                <span role='alert' className=''>
                  <Alert>{formik.errors.password}</Alert>
                </span>
              </div>
            </div>
          )}
        </Alert>
      </section>
      <section>
        <Alert>
          {formik.status && (
            <div className=''>
              <div className=''>
                <span role='alert' className=''>
                  <Alert>{formik.status}</Alert>
                </span>
              </div>
            </div>
          )}
        </Alert>
        <Button type='submit' disabled={loading}>
          {loading ? (
            <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
          ) : (
            'Sign In'
          )}
        </Button>
        <div className='my-2'>
          <Link to='/auth/forgot-password'>
            <p>Forgot password?</p>
          </Link>
        </div>
      </section>
    </form>
  )
}

export default observer(Login)
