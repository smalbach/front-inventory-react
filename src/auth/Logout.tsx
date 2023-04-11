import {useContext, useEffect} from 'react'

import {RootStoreContext} from 'stores/rootStore'

export function Logout() {
  const rootStore = useContext(RootStoreContext)

  const {logout} = rootStore.authStore
  useEffect(() => {
    logout()
    window.location.href = '/'
  }, [])

  return <> </>
}
