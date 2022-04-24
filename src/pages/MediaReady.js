import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { FiCamera } from 'react-icons/fi';
import { BsFillMicFill } from 'react-icons/bs';
import DropDown from '../components/DropDown'
import { getInputDevices } from './../utils/video';
import Player from '../components/Player';

let testStream;

export default function MediaReady() {
  const [camera, setCamera] = useState({ status: true, selected: { label: '', deviceId: '' } });
  const [mic, setMic] = useState({ status: true, selected: { label: '', deviceId: '' } });
  const [stream, setStream] = useState(null);
  const [cameraList, setCameraList] = useState([]);
  const [micList, setMicList] = useState([]);
  const [status, setStatus] = useState(false);
  // const [dropdownCamera, setDropdownCamera] = useState(false)

  useEffect(() => {
    async function asyncFun() {
      const devices = await getInputDevices();
      console.log('MediaReady :: devices :: ', devices);
      setCameraList(devices.cameras);
      setMicList(devices.mics);
      setCamera({ status: true, selected: { label: devices.cameras[0].label, deviceId: devices.cameras[0].deviceId } })
      setMic({ status: true, selected: { label: devices.mics[0].label, deviceId: devices.mics[0].deviceId } })
      changeStream({ cameraId: devices.cameras[0].deviceId, micId: devices.mics[0].deviceId })

    }
    asyncFun();
  }, [])

  // useEffect(() => {
  // console.log('aaa', document.querySelector('#testVideo'), stream);
  // document.querySelector('#testVideo').url = stream;
  // document.querySelector('#testVideo').play();
  // React.findDOMNode(videoPlayer.current).load();
  // videoPlayer.current.url = stream;
  // videoPlayer.current.play()
  // }, [stream])


  function changeStream({ cameraId, micId }) {
    // console.log('MediaReady :: changeStream :: cameraId : micId :', cameraId, micId);
    if (testStream) {
      testStream.getTracks().forEach((track) => track.stop());
    }

    const mediaConstraints = {
      video: { deviceId: cameraId },
      audio: { deviceId: micId },
    };

    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then((mediaStream) => {
        console.log('MediaReady :: changeStream :: mediaStream :: ', mediaStream);
        testStream = mediaStream;
        setStatus(true)
        setStream(mediaStream);
        // console.log('videoPlayer.current ::', videoPlayer.current)
        // if (!videoPlayer.current) {
        //   return setTimeout(() => changeStream({ cameraId, micId }), 1000)
        // }


      })
      .catch((error) => {
        console.error("MediaCheck ::: error : ", error);
      });
  }


  const cameraChangeHandler = (val) => {
    console.log('MediaReady :: cameraChangeHandler :: val :: ', val);
    const selectedCamera = cameraList.filter(c => c.deviceId === val);
    setCamera({ status: true, selected: { label: selectedCamera[0].label, deviceId: selectedCamera[0].deviceId } })
    localStorage.setItem('activeCamera', selectedCamera[0].deviceId)
    setStatus(false)
    changeStream({ cameraId: selectedCamera[0].deviceId, micId: localStorage.getItem('activeMic') })
  }

  const micChangeHandler = (val) => {
    console.log('MediaReady :: micChangeHandler :: val :: ', val);
    const selectedMic = micList.filter(m => m.deviceId === val);
    setMic({ status: true, selected: { label: selectedMic[0].label, deviceId: selectedMic[0].deviceId } })
    localStorage.setItem('activeMic', selectedMic[0].deviceId)
    setStatus(false);
    changeStream({ cameraId: localStorage.getItem('activeCamera'), micId: selectedMic[0].deviceId })
  }

  // useEffect(() => {
  //   return () => <ReactPlayer />;
  // }, [mic, camera])

  console.log('status ::', status, stream)
  return (
    <>
      <Box style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        <Grid container spacing={2} style={{ flexGrow: 1, alignItems: 'center' }}>
          <Grid item xs={12} sm={6} style={{ borderRight: '1px solid gray' }} >
            <Box style={{ width: '70%', marginLeft: '15%' }} >
              {status && stream && <Player stream={stream} />}
              {/* <video autoPlay={true} id='testVideo' ref={videoPlayer} srcObj={stream} /> */}
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box >
                  <Button style={{ borderRadius: '10%', aspectRatio: '1:1', height: '40px', width: '40px' }} variant="outlined"> <FiCamera /> </Button>
                  <Box style={{ marginTop: '20px' }}>
                    <DropDown onChangeHandler={cameraChangeHandler} options={cameraList} label={'Selected Camera'} value={camera.selected.deviceId} />
                  </Box>

                </Box>
                <Box>
                  <Button style={{ borderRadius: '10%', aspectRatio: '1:1', height: '40px', width: '40px' }} variant="outlined"> <BsFillMicFill /> </Button>
                  <Box style={{ marginTop: '20px' }}>
                    <DropDown onChangeHandler={micChangeHandler} options={micList} label={'Selected Mic'} value={mic.selected.deviceId} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}  >
          </Grid>
        </Grid>
      </Box>
    </>
  )

}
