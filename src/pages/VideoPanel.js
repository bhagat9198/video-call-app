import React, { useEffect, useRef, useState } from 'react';
// import { socket } from './../utils/config';
import { getInputDevices } from '../utils/video'

// google free STUN servers
const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

let localPeerConnection = new RTCPeerConnection(servers);
let remotePeerConnection = new RTCPeerConnection(servers);

let localStream;
let remoteStream;

const mediaStreamConstraints = {
  video: true,
  audio: true
}



export default function VideoPanel() {
  const [myStream, setMyStream] = useState(null);
  const refs = useRef([useRef(null), useRef(null)]);
  const myVideoRef = useRef(null);


  function getOtherPeer() {
    console.log('VideoPanel :: getOtherPeer')
  }

  function handleConnectionSuccess() {
    console.log('VideoPanel :: handleConnectionSuccess')

  }

  function handleConnectionFailure() {
    console.log('VideoPanel :: handleConnectionFailure')

  }

  function getPeerName() {
    console.log('VideoPanel :: getPeerName')

  }

  function createdAnswer(description) {
    console.log(`Answer from remotePeerConnection:\n${description.sdp}.`);

    console.log('remotePeerConnection setLocalDescription start.');
    remotePeerConnection.setLocalDescription(description)
      .then(() => {
        setLocalDescriptionSuccess(remotePeerConnection);
      }).catch(setSessionDescriptionError);

    console.log('localPeerConnection setRemoteDescription start.');
    localPeerConnection.setRemoteDescription(description)
      .then(() => {
        setRemoteDescriptionSuccess(localPeerConnection);
      }).catch(setSessionDescriptionError);
  }

  function setLocalDescriptionSuccess() {
    console.log('VideoPanel :: setLocalDescriptionSuccess')

  }

  function setRemoteDescriptionSuccess() {
    console.log('VideoPanel :: setRemoteDescriptionSuccess')

  }

  function createdOffer(description) {
    console.log(`createdOffer :: Offer from localPeerConnection:\n${description.sdp}`);

    console.log('createdOffer :: localPeerConnection setLocalDescription start.');
    localPeerConnection.setLocalDescription(description)
      .then(() => {
        setLocalDescriptionSuccess(localPeerConnection);
      }).catch(setSessionDescriptionError);

    console.log('createdOffer :: remotePeerConnection setRemoteDescription start.');
    remotePeerConnection.setRemoteDescription(description)
      .then(() => {
        setRemoteDescriptionSuccess(remotePeerConnection);
      }).catch(setSessionDescriptionError);

    console.log('createdOffer :: remotePeerConnection createAnswer start.');
    remotePeerConnection.createAnswer()
      .then(createdAnswer)
      .catch(setSessionDescriptionError);
  }

  function setSessionDescriptionError() {
    console.log('VideoPanel :: setSessionDescriptionError')

  }

  function handleConnection(event) {
    console.log('VideoPanel :: handleConnection')
    const peerConnection = event.target;
    const iceCandidate = event.candidate;

    if (iceCandidate) {
      const newIceCandidate = new RTCIceCandidate(iceCandidate);
      const otherPeer = getOtherPeer(peerConnection);

      otherPeer.addIceCandidate(newIceCandidate)
        .then(() => {
          handleConnectionSuccess(peerConnection);
        }).catch((error) => {
          handleConnectionFailure(peerConnection, error);
        });

      console.log(`VideoPanel :: ${getPeerName(peerConnection)} ICE candidate:\n` +
        `${event.candidate.candidate}.`);
    }
  }

  function handleConnectionChange() {
    console.log('VideoPanel :: handleConnectionChange')

  }

  function gotLocalMediaStream(mediaStream) {
    // console.log('VideoPanel :: mediaStream :: ', mediaStream);
    setMyStream(mediaStream)
    refs.current[0].current.srcObject = mediaStream;
    localStream = mediaStream;
    // console.log('VideoPanel :: Received local stream.');

    localPeerConnection.addStream(localStream);
    // console.log('VideoPanel :: Added local stream to localPeerConnection.');
  }

  function handleLocalMediaStreamError(error) {
    console.log('VideoPanel :: handleLocalMediaStreamError :: error :: ', error);

  }



  useEffect(() => {
    // socket.on('connect', () => {
    //   console.log('VideoPanel :: Connected')
    // })

    // socket.on('memeber-added', data => {

    // })


    localPeerConnection.addEventListener('icecandidate', handleConnection);
    localPeerConnection.addEventListener('iceconnectionstatechange', handleConnectionChange);

    console.log('VideoPanel :: Requesting local stream.');
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
      .then(gotLocalMediaStream)
      .catch(handleLocalMediaStreamError);

    console.log('VideoPanel :: localPeerConnection createOffer start.');
    localPeerConnection.createOffer()
      .then(createdOffer).catch(setSessionDescriptionError);

  }, [])


  return (
    <>
      <video autoPlay={true} muted={true} ref={refs.current[0]} height="500" width={500} />
      <video autoPlay={true} ref={refs.current[1]} height="500" width={500} />
    </>
  )
}
