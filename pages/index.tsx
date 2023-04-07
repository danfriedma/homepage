import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Bubbles from '@/components/Bubbles'
import InPhiKnit from '@/components/InPhiKnit'
import Cycle from '@/components/Cycle'
import Circle from '@/components/Circle'
import FadeInOut from '@/components/FadeInOut'
import { Open_Sans, Crimson_Text, Inter } from 'next/font/google'
const opensans = Open_Sans({ subsets: ['latin'] })
const crimsonText = Crimson_Text({subsets: ['latin'],weight: ['700']})
const inter = Inter({ subsets: ['latin'] })

import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Daniel Friedman Space</title>
        <meta name="description" content="Love. Serve. Remember" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/drop_white.svg" />
      </Head>

      <div className="flex absolute w-full h-full justify-center items-center" >
        <div style={{position: 'relative', width: '500px', height: '500px'}}>
          <Circle />
        </div>
      </div>
      <div className="flex absolute w-full h-full justify-center items-center" >
        <Cycle words={['breathe', 'love', 'be', 'nurture', 'regenerate']}/>
      </div>

      <main className={styles.main}>

        <div className={styles.description}>
          <motion.span
            layout="position"
            layoutRoot
            layoutId={'description-text'}

          >
            <FadeInOut>Daniel Friedman / Portfolio</FadeInOut>
          </motion.span>
        </div>

        <div className={styles.grid}>
          <Link
            href="/portfolio"
            className={styles.card}
          >
            <h2 className={inter.className}>
              Fullstack Software Engineer
              <span>
                <Image
                  src={'right-arrow.svg'}
                  alt={'right arrow'}
                  width={20}
                  height={20}
                />
              </span>
            </h2>
          </Link>
          <Link
            href="/artist"
            className={styles.card}
          >
            <InPhiKnit/>
            <h2 className={inter.className}>
              Artist
              <span>
                <Image
                  src={'right-arrow.svg'}
                  alt={'right arrow'}
                  width={20}
                  height={20}
                />
              </span>
            </h2>
            {
              // <p className={inter.className}>
              //   Portfolio
              // </p>
            }

          </Link>
        </div>
      </main>
    </>
  )
}
