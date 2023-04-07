import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Cycle from '@/components/Cycle'

const Circle = () => {
  return (
    <Link href="/" scroll={false}>
      <motion.div
        layoutId={'circle-container'}
        layoutRoot
        transition={{
          duration: 1,
          ease: "easeInOut"
        }}
        className="relative w-full h-full"
      >
      {
        <motion.img
          layoutId={'circle'}
          src="/drop.svg"
          alt="VE"
          transition={{
            duration: 1,
            ease: "easeInOut"
          }}
          className="pointer-events-auto object-contain"
          priority="true"
        />

      }
        </motion.div>
      </Link>
    )
}


export default Circle
