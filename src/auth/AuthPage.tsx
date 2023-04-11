/* eslint-disable jsx-a11y/anchor-is-valid */

import {Outlet, Route, Routes} from 'react-router-dom'

import LoginWrapper from './components/LoginWrapper'
import { Logout } from './Logout'
import {useEffect} from 'react'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (<Outlet />)
}

const AuthPage = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='login' element={<LoginWrapper />} />
        <Route path='logout' element={<Logout />} />
        <Route index element={<LoginWrapper />} />
      </Route>
    </Routes>
  )
}

export {AuthPage}
