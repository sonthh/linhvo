import './style.scss'
import './animation.scss'
import Gallery from 'react-photo-gallery'
import { audios, photos } from './source'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { useCallback, useEffect, useState } from 'react'
import { publicUrl } from '../config'

const photoSource = photos.map((e) => ({
  ...e,
  src: publicUrl + '/photo/' + e.src,
}))

export const HomePage = () => {
  const [playing, setPlaying] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement>()

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  const playSound = () => {
    !playing ? audio?.play() : audio?.pause()
    setPlaying(!playing)
  }

  useEffect(() => {
    const audio = new Audio(
      publicUrl + '/audio/' + audios[Math.floor(Math.random() * audios.length)]
    )
    audio.loop = true
    setAudio(audio)
  }, [])

  return (
    <div>
      <div className="play-button" onClick={playSound}>
        <img alt="linh vo" src={publicUrl + '/photo/sound.png'} />
      </div>
      <div className="gallery">
        <Gallery photos={photoSource} onClick={openLightbox} direction="column" />
      </div>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photoSource.map((x) => ({
                ...x,
                source: x.src,
                // srcset: x.srcSet,
                // caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      <div className={`heart-box ${!playing ? 'dnone' : ''}`}>
        <div className="heart-logo" />
        <div className="heart animate-topright" />
        <div className="heart animate-bottomright" />
        <div className="heart animate-topleft" />
        <div className="heart animate-bottomleft" />
        <div className="heart animate-up" />
        <div className="heart animate-down" />
        <div className="heart animate-left" />
        <div className="heart animate-right" />
      </div>
    </div>
  )
}
