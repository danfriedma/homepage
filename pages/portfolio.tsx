import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Project from '@/components/Project'
import Circle from '@/components/Circle'
import { motion } from 'framer-motion'
// Fonts
import { Open_Sans, Crimson_Text, Inter } from 'next/font/google'
const opensans = Open_Sans({ subsets: ['latin'] })
const crimsonText = Crimson_Text({subsets: ['latin'],weight: ['700']})
const inter = Inter({ subsets: ['latin'] })
import styles from '@/styles/Home.module.css'


const projects = [
  {
    title: 'Chrysanthemum',
    challenge: `Design an engaging visual and audio experience for mindful breathing.`,
    solution: `Created an immersive web-app to connect your heartbeat to your browser to see and hear your heart's rhythms while you breathe.`,
    link: 'https://chrysanthemum.app',
    iframe: true,
    images: [
      {
        src: '/chrysanthemum_full.jpg',
        alt: 'Chrysanthemum visual'
      },
      {
        src: '/chrysanthemum_graph.png',
        alt: 'Chrysanthemum graph'
      },
      {
        src: '/pawa.jpg',
        alt: 'Chrysanthemum Pawa Edition'
      }
    ],
  },
  {
    title: 'Luminance',
    challenge: `Make the metaverse a peaceful place to visit.`,
    solution: `Designed a natural landscape for VR and web, that dynamically responds to the users' heartbeat`,
    link: 'https://luminance.one',
    iframe: true,
    images: [
      {},
      {
      src: '/gradient.png',
      alt: 'Luminance VR gradient'
      }

    ],
  },
  {
    title: 'Viewcy',
    challenge: `Make Viewcy more intuitive to navigate for our music community. `,
    solution: `Unify the design language used across the site and underlying infrastructure, migrating from Ruby on Rails to a web-component framework, Hybrids,
      creating reusable components, standardized icons and page layouts.`,
    link: 'https://viewcy.com',
    images: [
      {
        src: '/viewcy.png',
        alt: 'Viewcy player'
      },
      {
        src: '/viewcy_menu.png',
        alt: 'Viewcy menu'
      },
    ],
  },
  {
    title: 'Sunbow Collective',
    challenge: `Redesign a wellness brand's website to feel like a warm, inviting space beyond typical cookiecutter templates.`,
    solution: `Design logo, animations and splash video with a pastel rainbow pallet.`,
    link: 'https://sunbowcollective.com/',
    images: [
      {
        src: '/sunbow_collective.png',
        alt: 'Sunbow Collective'
      },
      {
        src: '/sunbow_logo_full.png',
        alt: 'Sunbow Collective logo',
        objectFit: 'contain'
      },
    ],
  },
  {
    title: 'Watercycle',
    challenge: `Show rather than tell. Create a visual aid to pitch a new agricultural product.`,
    solution: `Design a 3D model of the product that loads quickly and can be explored in real-time.`,
    link: 'https://watercycle.vercel.app',
    iframe: true,
    pointerEvents: true,
    images: [
      {
        src: '/chrysanthemum_full.jpg',
        alt: 'Chrysanthemum visual'
      },
    ],
  },
  {
    title: 'abc Kitchen(s)',
    challenge: `In a one week quick design sprint, rehost and revamp an iconic NYC restaurant's website during a sudden business transition.`,
    solution: `Design using reusable React components and work closely with design team to elevate a simple and informative design.`,
    link: 'https://abckitchens.nyc',
    images: [
      {
        src: '/abc_kitchens.png',
        alt: 'abc Kitchen(s)'
      }, {
        src: '/abcv_table.jpeg',
        alt: 'abcV table'
      },
    ],
  },
  {
    title: 'Pagoda',
    challenge: `Build an MVP website that makes a new financial product easy to understand.`,
    solution: `Develop brand aesthetic and prototype several different approaches for new users to learn about the product,
      including user story cards and an interactive calculator.`,
    link: 'https://enterpagoda.com',
    iframe: true,
    images: [
      {
        src: '/chrysanthemum_full.jpg',
        alt: 'Chrysanthemum visual'
      },
      {
        src: '/pagoda_icon.png',
        alt: 'Pagoda icon',
        objectFit: 'contain'
      },
      {
        src: '/pagoda_icon_dodeca.png',
        alt: 'Pagoda icon dodeca',
        objectFit: 'contain'
      },
    ],
  },
  // {
  //   title: 'Altman Ortho CT',
  //   description: 'designed a new way to meditate',
  //   images: [
  //     {
  //       src: '/chrysanthemum_full.jpg',
  //       alt: 'Chrysanthemum visual'
  //     },
  //     {
  //       src: '/chrysanthemum_graph.png',
  //       alt: 'Chrysanthemum graph'
  //     },
  //   ],
  // },
]


export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Fullstack Software Engineer Portfolio</title>
        <meta name="description" content="A sample of digital work" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/drop_white.svg" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div className={styles.nav + " relative contents w-full h-full justify-start items-start pointer-events-none"}>
            <div className="w-20 h-20 p-4">
              <Circle layoutRoot />
            </div>
          </div>
          <motion.span
            layout="position"
            layoutRoot
            layoutId={'description-text'}
            transition={{duration: 1}}
            >
            Portfolio / Fullstack Software Engineer
          </motion.span>
        </div>

        <motion.div
          className="flex flex-col text-center justify-center p-4 min-h-[80vh] sm:min-h-[60vh]"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 2}}
        >
          <h1 className={crimsonText.className + " text-3xl"}>Hi, I'm Daniel. Nice to meet you.</h1>
          <p className={inter.className + ' p-4'}>During my 8+ year journey as a Software Engineer,
            I've contributed to startups in NYC and remotely &#8212;
            <br/>collaborated with marketers, designers, and engineers to build new websites and digital products.
            <br/><br/>I love contributing to meaningful projects and learning new skills.
            <br/><br/>Below is a sample of projects I've worked on over the years.
          </p>
        </motion.div>

        <div className={styles.glow + ' container'}>
          {
            projects.map((project, i) =>
              (<Project project={project} offset={i} key={i} />)
            )
          }
        </div>
        <div className="pb-16 text-center">
          <h1 className={crimsonText.className + " text-3xl"}>
            Contact me here to sculpt a digital vision together
          </h1>
          <p className={inter.className}>
            dan.friedma@gmail.com
          </p>
        </div>
      </main>
    </>
  )
}
