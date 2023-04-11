import AuthStore from 'auth/store/AuthStore'
import {createContext} from 'react'

export class RootStore {
  authStore: AuthStore


  constructor() {
    this.authStore = new AuthStore(this)

  }
}

export const RootStoreContext = createContext(new RootStore())
