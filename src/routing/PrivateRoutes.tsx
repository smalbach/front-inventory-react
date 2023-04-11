import {Navigate, Route, Routes} from 'react-router-dom'

import AdminLayout from "layouts";
import { CreateCompany } from 'views/company/CreateCompany';

// import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/create-company' />} />
        {/* Pages */}
        <Route path='create-company' element={<CreateCompany />} /> 

        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}


export {PrivateRoutes}
