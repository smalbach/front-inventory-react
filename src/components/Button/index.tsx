import tw from 'tailwind-styled-components'

interface ButtonProps {
  width?: string
  height?: string
  disabled?: boolean
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
  outline?: boolean
  info?: boolean
  type?: any
}

const Button = tw.button<ButtonProps>`

  flex
  justify-center
  items-center
  rounded-lg
  content-center
  text-sm
  pl-2
  pr-2
  text-white
  text-center


  hover:bg-400
  focus:outline-none

  ${(p: any) => (p.width ? p.width : 'w-full')}
  ${(p: any) => (p.height ? p.height : 'h-8')}
  ${(p: any) =>
    p.disabled
      ? `
    cursor-not-allowed
    opacity-50
  `
      : ''}
  ${(p: any) => (p.variant && p.variant === 'cyan' ? 'bg-cyan-500' :  p.variant )}
  ${(p: any) => (!p.variant ? 'bg-cyan-500 ' : '')}
  ${(p: any) => (p.outline ? 'bg-white text-cyan-500 border-[1px] border-cyan-500 ' : '')}
  ${(p: any) => (p.light ? ' hover:bg-gray-100' : '')}
  ${(p: any) => (p.info ? 'bg-blue-500 hover:bg-blue-400' : '')}

`
export {Button}
