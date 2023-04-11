import {UserModel} from 'auth/models/User/UserModel'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/me`
export const LOGIN_URL = `${API_URL}/auth/login`


// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post(`${LOGIN_URL}`, {
    email,
    password,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
