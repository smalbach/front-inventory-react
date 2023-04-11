export const ErrorParser = (error: string) => {
  switch (error) {
    case 'emailNotExists':
      return 'Email not exists'
    case 'userOrPasswordIncorrect':
      return 'Usuario o contraseña incorrectos'
    case 'Unauthorized':
      return 'Unauthorized'
    case 'Not Found':
      return 'Not Found'
    case 'Bad Request':
      return 'Bad Request'
    case 'Internal Server Error':
      return 'Internal Server Error'
    case 'Service Unavailable':
      return 'Service Unavailable'
    default:
      return 'Unknown Error'
  }
}
