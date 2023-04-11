import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {FC, useContext, useEffect} from 'react'

import App from 'App'
import {AuthPage} from 'auth/AuthPage'
import {Logout} from 'auth/Logout'
import { PrivateRoutes } from './PrivateRoutes'
import {RootStoreContext} from 'stores/rootStore'
import {observer} from 'mobx-react'

const {REACT_APP_PUBLIC_URL} = process.env

const AppRoutes: FC = () => {
  const rootStore = useContext(RootStoreContext)
  const {isAuthenticated, loading} = rootStore.authStore

  useEffect(() => {
    if (!loading) {
      const splashScreen = document.getElementById('splash-screen')

      if (splashScreen) {
        splashScreen.style.setProperty('display', 'none')
      }
    }
    // eslint-disable-next-line
  }, [loading])

  return (
    <BrowserRouter basename={REACT_APP_PUBLIC_URL}>
      <Routes>
        <Route path='logout' element={<Logout />} />
        <>
          <Route element={<App />}>
            {!isAuthenticated ? (
              <>
                <Route path='auth/*' element={<AuthPage />} />
                <Route path='*' element={<Navigate to='/auth' />} />
              </>
            ) : (
              <>
                <Route path='/*' element={<PrivateRoutes />} />
                <Route index element={<Navigate to='create-company' />} />
              </>
            )}
          </Route>
        </>
      </Routes>
    </BrowserRouter>
  )
}

export default observer(AppRoutes)
