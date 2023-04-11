import Login from './Login'

const LoginWrapper = () => {
  return (
    <>
    <div className=' flex-wrap overflow-hidden table my-0 w-full'>
      <div className='w-full h-screen overflow-hidden  mx-auto my-auto table-cell align-middle'>
        <div className=''>
          <header className='h-32 text-center w-48 justify-center items-center lg:left-0 m-auto lg:w-32 xl:w-32'>
            <img
              src={'https://uploads-ssl.webflow.com/5ef9e7820240534a394d4b30/634dad4b9b56535c1555419b_Logo%20Imagine.webp'}
              alt='imagineapps'
              className=''
            />
          </header>
        </div>
        <div className='align-content-center lg:px-20 xl:px-32 '>
          <Login />
        </div>
      </div>

    </div>
    </>
  )
}

export default LoginWrapper
