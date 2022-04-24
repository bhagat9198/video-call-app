import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

export default function Player(props) {
  console.log('ReactPlayer :: props :: ', props);
  const { stream } = props;
  const videoPlayer = useRef(null);

  useEffect(() => {
    if (!stream) {
      videoPlayer.current.url = '';
    }
    videoPlayer.current.url = stream;
    videoPlayer.current.playing = true;
  }, [stream])

  return (
    <ReactPlayer id='testVideo' s playing={true} url={stream} ref={videoPlayer} fallback='Loading' />
  )
}
