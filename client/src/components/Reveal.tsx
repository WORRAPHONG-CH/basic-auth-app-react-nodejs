import React from 'react'
import { motion , useInView, useAnimation } from 'framer-motion';

// Define props to this component
interface RevealProps {
  children:JSX.Element, // Get component as a input
  width?: "fit-content" | "100%" // This animation component will cover with width of the input components
}


const Reveal:React.FC<RevealProps> = (
  {children, width}
) => {
  return (
    <div className='relative overflow-hidden'>
      <motion.div className=''
      variants={{
        hidden:{opacity:0,y:75}, 
        visible:{opacity:1,y:0}
      }}
      initial={'hidden'} animate={'visible'} transition={{duration:0.5, delay:0.25}}
      >
        {children}
      </motion.div>
        

    </div>
  )
}

export default Reveal