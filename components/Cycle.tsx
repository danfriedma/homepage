import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Open_Sans, Crimson_Text, Inter } from 'next/font/google'
const opensans = Open_Sans({ subsets: ['latin'] })
const crimsonText = Crimson_Text({subsets: ['latin'],weight: ['700']})
const inter = Inter({ subsets: ['latin'] })

const style = {
  // animation: 'fade 6s linear infinite',
  fontSize: '3em',
  color: 'white',
  filter: 'drop-shadow(0 0 2.75rem crimson)',
  textDecoration: 'overline',
  letterSpacing: '.05em'
}

const Cycle = ({words}) => {
  const [index, setIndex] = useState(0)

  let interval
  useEffect(() => {
    setTimeout(() => {
      interval = setInterval(() => {
        setIndex(index => index + 1)
      }, 6000)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return <motion.span
    initial={{opacity: 0}}
    animate={{opacity: [0,1]}}
    transition={{delay: 1.5, duration: 3, repeatType: 'reverse', repeat: Infinity}}
    style={{...style}}
    className={"fade " + crimsonText.className}
  >
    {words[index%words.length]}
  </motion.span>
}

export default Cycle
