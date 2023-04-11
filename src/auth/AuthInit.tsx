import {FC, ReactNode, useContext, useEffect, useRef, useState} from 'react'

import {RootStoreContext} from 'stores/rootStore'
import SplashScreen from 'core/components/SplashScreen'
import {observer} from 'mobx-react'

interface BaseLayoutProps {
  children?: ReactNode;
}

const AuthInit: FC<BaseLayoutProps> = ({children }) => {
  const rootStore = useContext(RootStoreContext)
  const {accessToken, user, logout, isAuthenticated} = rootStore.authStore
  

  const didRequest = useRef(false)

  const [showSplashScreen, setShowSplashScreen] = useState(true)

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (didRequest.current) {
          setShowSplashScreen(false)
        } 
      } catch (error) {
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }
      return () => (didRequest.current = true)
    }

    if (isAuthenticated && accessToken) {
      requestUser(accessToken)
    } else {
      setShowSplashScreen(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return showSplashScreen ? <SplashScreen /> : <>{children}</>
}

export default observer(AuthInit)
