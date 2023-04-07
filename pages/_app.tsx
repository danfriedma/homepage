import '@/styles/globals.css'
import '@/styles/animate.css'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

export default function App({ Component, pageProps }: AppProps) {

  return <ParallaxProvider>
  <AnimatePresence>
      <Component {...pageProps} />
    </AnimatePresence>
  </ParallaxProvider>
}
