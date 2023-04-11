export default function setupAxios(axios: any, accessToken: any) {
  axios.defaults.headers.Accept = 'application/json'

  axios.interceptors.request.use(
    (config: any) => {
      config.headers.Authorization = `Bearer ${accessToken}`

      return config
    },
    (err: any) => {
      return Promise.reject(err)
    }
  )

  axios.interceptors.response.use(
    function (response: any) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    function (error: any) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      //if error 401 show login page
      return Promise.reject(error)
    }
  )
}
