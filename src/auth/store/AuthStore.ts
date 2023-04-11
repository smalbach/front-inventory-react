import {UserModel, initialUser} from 'auth/models/User/UserModel'
import {action, makeObservable, observable, toJS} from 'mobx'
import {getUserByToken, login} from '../models/AuthRequest'

import {ErrorResponse} from 'core/error/types'
import {RootStore} from 'stores/rootStore'
import axios from 'axios'
import {configure} from 'mobx'
import setupAxios from 'setup/axios/SetupAxios'

configure({
  enforceActions: 'never',
})

interface IStorageUser {
  'persist-data-auth': {
    accessToken: string
    user: string
    timezone: string
    language: string
  }
}

const initialStateData: IStorageUser = {
  'persist-data-auth': {
    accessToken: '',
    user: '',
    timezone: '',
    language: 'es',
  },
}

export default class AuthStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeObservable(this)
    this.isAuthenticated = !!this.getAccessToken()
  }

  @observable accessToken: string | null = null
  @observable onErrorLogin: ErrorResponse | null = null
  @observable user: UserModel
  @observable loading = true
  @observable isAuthenticated = false
  @observable authData: IStorageUser = initialStateData

   @action getAccessToken() {
    try {
      const documentData = JSON.parse(localStorage.getItem('document')?.toString() ?? '{}')
      if (documentData['persist-data-auth'].accessToken !== '') {
        this.accessToken = documentData['persist-data-auth'].accessToken
        setupAxios(axios, this.accessToken)
        if (this.accessToken) {
          getUserByToken(this.accessToken)
            .then((user) => {
              this.user = user.data as unknown as UserModel
              this.loading = false
              this.isAuthenticated = true
            })
            .catch((error) => {
              this.loading = false
              this.isAuthenticated = false
            })
        }

        return true
      }
    } catch (e) {}
    this.loading = false
    this.isAuthenticated = false
    this.accessToken = null
    this.user = initialUser
    return false
  }

  @action setUser(user: UserModel) {
    this.user = user
  }

  @action logout = () => {
    this.isAuthenticated = false
    this.accessToken = ''
    this.authData = {
      'persist-data-auth': {
        accessToken: '',
        user: '',
        timezone: '',
        language: 'es',
      },
    }
    try {
      setupAxios(axios, '')
      localStorage.removeItem('document')
    } catch (e) {}
    window.location.href = '/'
  }

  @action loginUser = async (user: string, password: string) => {
    this.onErrorLogin = null

    await login(user, password)
      .then((response) => {
        this.accessToken = response.data.token
        setupAxios(axios, response.data.token)
        this.setUser(response.data.user)

        this.authData = {
          'persist-data-auth': {
            accessToken: response.data.token,
            user: JSON.stringify(response.data.user),
            timezone: '',
            language: 'es',
          },
        }

        this.isAuthenticated = true

        localStorage.setItem('document', JSON.stringify(this.authData))
      })
      .catch((error) => {
        this.onErrorLogin = error.response.data || {error: 'Error'}
        this.loading = false
      })
  }

}
