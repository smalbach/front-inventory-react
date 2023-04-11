import tw from 'tailwind-styled-components'

interface AlertProps {
  variant?: string
  type?: string
}
const Alert = tw.p<AlertProps>`
  italic
  -mt-3
  p-0
  text-xs
  text-cyan-500

`
export {Alert}
