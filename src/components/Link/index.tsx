import {Link as RLink} from 'react-router-dom'
import React from 'react'

interface IProps {
  to: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const Link: React.FC<IProps> = ({to, children, className, onClick}) => {
  return (
    <RLink
      to={to}
      onClick={onClick}
      className={
        className
          ? className
          : `
		text-center
		font-bold
		text-sm
		text-cyan-500
		hover:text-cyan-500
`
      }
    >
      {children}
    </RLink>
  )
}

// export default index

// const Link = tw.Link`
//  to='/'
//       className='text-center
// 		font-bold
// 		text-sm
// 		text-primary-500
// 		hover:text-cyan-500'
//     />
// `

export {Link}
