import { Parallax } from 'react-scroll-parallax'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from '@/styles/Project.module.css'
// Fonts
import { Open_Sans, Crimson_Text, Inter } from 'next/font/google'
const opensans = Open_Sans({ subsets: ['latin'] })
const crimsonText = Crimson_Text({subsets: ['latin'],weight: ['700']})
const inter = Inter({ subsets: ['latin'] })

const center = {display: 'flex', justifyContent: 'center'}
const alignStart = {display: 'flex', justifyContent: 'flex-start'}

const Frame = ({src, alt}) => {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        style={{borderRadius: '12px', objectFit: 'cover'}}
        priority
      />
    </>
  )
}

const ParallaxFrame = ({src, alt, width, height, translateY, translateX, objectFit = 'cover'}) => {
  return (
    <Parallax translateY={translateY}>
      <div style={{
          position: 'absolute',
          width: width,
          height: height,
          transform: `translateX(${translateX}%)`
        }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
          style={{borderRadius: '12px', objectFit: objectFit}}
          priority
        />
      </div>
    </Parallax>
  )
}

const Project = ({project, offset}) => {
  const Info = () => (
    <div className={'col-12 col-lg-6 ' + styles.projectInfo}>
      <h1 className={crimsonText.className}>
        {project.title}
      </h1>
      <p
        className={opensans.className}
        style={{fontSize: '1em'}}>
        <span className={styles.projectChallenge}>
          <span className={styles.projectHeading}>CHALLENGE</span>
          <br/>{project.challenge}
        </span>
        <span className={styles.projectSolution}>
          <span className={styles.projectHeading}>SOLUTION</span>
          <br/>{project.solution}
        </span>
      </p>
    </div>
  )

  const Images = () => (
    <div className={'col-12 col-lg-6'} style={{
        ...center,
        paddingBottom: '4em'
      }}>
        <div style={{
          position: 'relative',
          minWidth: project.landscape ? '532px' : '450px',
          minHeight: project.landscape ? '399px' : '600px'
        }}>
          {
            project.iframe ?
              (
                <div style={{overflow: 'hidden', height: '100%'}}>
                  <iframe
                    src={project.link}
                    style={{
                      overflow: 'hidden',
                      '-webkit-overflow-scrolling': 'touch',
                    }}
                    scrolling={project.pointerEvents ? 'yes' : 'no'}
                    loading='lazy'
                   />
                   {
                     (project.pointerEvents) ?
                        '' :
                        (<div style={{position: 'absolute', width: '100%', height:'100%', top: 0}}></div>)
                   }
                  </div>
              ) :
              (
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                    style={{borderRadius: '12px', objectFit: 'cover'}}
                    priority
                  />
                </div>
              )
          }
        </div>
        {
          (project.images[1] !== undefined) ?
            (<ParallaxFrame
                src={project.images[1].src}
                alt={project.images[1].alt}
                width={'150px'}
                height={'260px'}
                translateY={[50, -40]}
                translateX={-80}
                objectFit={project.images[1].objectFit || 'cover'}
            />) : ''
        }
        {
        (project.images[2] !== undefined) ?
          (<ParallaxFrame
              src={project.images[2].src}
              alt={project.images[2].alt}
              width={'360px'}
              height={'270px'}
              translateY={[100, -20]}
              translateX={-160}
              objectFit={project.images[2].objectFit || 'cover'}
          />) : ''
        }
    </div>
  )

  return (
    <motion.div
      init={{opacity: 0, y: 200}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0}}
      transition={{duration: 1}}
      className={'row ' + styles.project} style={{...center}}
    >
      <Info/>
      <Images/>
    </motion.div>
  )
}

export default Project
