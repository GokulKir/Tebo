import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';

const SocketContext = createContext();

const socket = io("http://localhost:5000");
// const socket = io("https://tebo.devlacus.com/");

const SocketProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState(null);
  const [screenShareStream, setScreenShareStream] = useState(null); // New state for screen sharing stream
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [PageTrigger, setPageTrigger] = useState(false);
  const [me, setMe] = useState("");
  const [isScreenSharing, setIsScreenSharing] = useState(false); // New state for screen sharing
  const socket = useRef(null);

  const myVideo = useRef(null);
  const userVideo = useRef();
  const connectionRef = useRef();
  const myId = useRef(null);
  // const [localStream , setLocalStream ] = useState(null)

  useEffect(() => {
    const setupWebRTC = async () => {
      const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

      // Get user media stream
      const newStream = await mediaDevices.getUserMedia({
        video: {
          width: 3840,
          height: 2160,
          frameRate: 60,
          facingMode: 'user',
        },
        audio: true,
      });

      setStream(newStream);
      // myVideo.current.srcObject = newStream;

      // Initialize RTCPeerConnection and handle events
      const peerConnection = new RTCPeerConnection(configuration);
      peerConnection.addStream(newStream);

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          // Send ICE candidate to other peers
          socket.current.emit('ice-candidate', { candidate: event.candidate });
        }
      };

      peerConnection.onaddstream = (event) => {
        // Handle incoming stream from remote peer
        // For example: setRemoteStream(event.stream);
      };

      // Handle socket events for WebRTC signaling
      socket.current.on('callUser', ({ from, name: callerName, signal }) => {
        setCall({ isReceivingCall: true, from, name: callerName, signal });
      });

      // Other WebRTC and socket.io logic

      // Clean up when the component unmounts
      return () => {
        newStream.getTracks().forEach(track => track.stop());
        peerConnection.close();
      };
    };

    setupWebRTC();
  }, []);



  // useEffect(() => {
  //   const videoRendering = () => {
  //     if (PageTrigger) {
  //       navigator.mediaDevices
  //         .getUserMedia({
  //           video: {
  //             width: { ideal: 3840 },
  //             height: { ideal: 2160 },
  //             frameRate: { ideal: 60 },
  //             facingMode: "user",
  //           },
  //           audio: true,
  //         })
  //         .then((currentStream) => {
  //           setStream(currentStream);
  //           myVideo.current.srcObject = currentStream;
  //         })
  //         .catch((error) =>
  //           console.error("Error accessing media devices:", error)
  //         );

  //       // socket.on("me", (id) => {
  //       //   setMe(id);
  //       // });

  //       socket.on("callUser", ({ from, name: callerName, signal }) => {
  //         setCall({ isReceivingCall: true, from, name: callerName, signal });
  //       });
  //     }
  //   };
  //   // setTimeout(() => {
  //   //   videRendering();
  //   // }, 5000);
  //   videoRendering();
  // }, [PageTrigger]);


  useEffect(() => {
    socket.current = io(`${socket}`); // Replace with your socket.io server URL

    socket.current.on('me', (id) => {
      setMe(id);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const shareScreen = async () => {
    try {
      const screenStream = await mediaDevices.getDisplayMedia({ cursor: true });
      setScreenShareStream(screenStream);

      myVideo.current.srcObject = screenStream; // Update the source object to display screen share
      setIsScreenSharing(true);
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const stopScreenSharing = () => {
    if (screenShareStream) {
      screenShareStream.getTracks().forEach((track) => track.stop());
      setIsScreenSharing(false);

      // Restore the original video stream
      myVideo.current = stream;
    }
  };


  // useEffect(() => {
  //   socket.on("me", (id) => {
  //     setMe(id);
  //   });
  //   console.log(socket?.id,"😶‍🌫️",socket);
  // }, [socket]);

  // const shareScreen = () => {
  //   navigator.mediaDevices
  //     .getDisplayMedia({ cursor: true })
  //     .then((screenStream) => {
  //       setScreenShareStream(screenStream);

  //       myVideo.current.srcObject = screenStream; // Update the source object to display screen share
  //       setIsScreenSharing(true);
  //     })
  //     .catch((error) => console.error("Error sharing screen:", error));
  // };

  // const stopScreenSharing = () => {
  //   if (screenShareStream) {
  //     screenShareStream.getTracks().forEach((track) => track.stop());
  //     setIsScreenSharing(false);

  //     // Restore the original video stream
  //     myVideo.current.srcObject = stream;
  //   }
  // };

  // const answerCall = () => {
  //   setCallAccepted(true);

  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream,
  //     config: {
  //       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  //       sdpTransform: (sdp) => {
  //         sdp = sdp.replace(
  //           /a=mid:video\r\n/g,
  //           "a=mid:video\r\nb=AS:56000\r\n"
  //         ); // Adjust maxBitrate to 56000 kbps (56 Mbps)
  //         return sdp;
  //       },
  //     },
  //   });

  //   peer.on("signal", (data) => {
  //     socket.emit("answerCall", { signal: data, to: call.from });
  //   });

  //   peer.on("stream", (currentStream) => {
  //     userVideo.current.srcObject = currentStream;
  //   });

  //   peer.signal(call.signal);

  //   connectionRef.current = peer;
  // };



  const answerCall = () => {
    setCallAccepted(true);

    const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    const peerConnection = new RTCPeerConnection(configuration);

    // Add local stream to the peer connection
    peerConnection.addStream(stream);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Send ICE candidate to other peers
        socket.current.emit('ice-candidate', { candidate: event.candidate });
      }
    };

    peerConnection.onaddstream = (event) => {
      // Handle incoming stream from remote peer
      userVideo.current.srcObject = event.stream;
      console.log("peerConnection", peerConnection);
    };

    peerConnection.setRemoteDescription(call.signal).then(() => {

      console.log("Remote description", peerDescription);
      // Create answer
      peerConnection.createAnswer().then((answer) => {
        peerConnection.setLocalDescription(answer);
        console.log("Answer", answer);

        // Send answer to the caller
        socket.current.emit('answerCall', { signal: answer, to: call.from });
      });
    });

    connectionRef.current = peerConnection;
  };



  const callUser = async (id) => {
    try {
      socket.current.emit('getSocketId', id);

      const userSocketId = await new Promise((resolve) => {
        socket.current.on('getSocketId', (socketId) => {
          resolve(socketId);
        });
      });

      const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
      const peerConnection = new RTCPeerConnection(configuration);

      const newStream = await mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(newStream);

      // Add local stream to the peer connection
      peerConnection.addStream(newStream);

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          // Send ICE candidate to other peers
          socket.current.emit('ice-candidate', { candidate: event.candidate });
        }
      };

      peerConnection.onaddstream = (event) => {
        // Handle incoming stream from remote peer
        userVideo.current.srcObject = event.stream;
      };

      // Handle negotiation needed event
      peerConnection.onnegotiationneeded = async () => {
        try {
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);

          socket.current.emit('callUser', {
            userToCall: userSocketId,
            signalData: offer,
            from: me,
            name: 'your_name', // Replace with your name
          });
        } catch (error) {
          console.error('Error creating offer:', error);
        }
      };

      // Handle socket event for call accepted
      socket.current.on('callAccepted', async (signal) => {
        setCallAccepted(true);
        await peerConnection.setRemoteDescription(signal);
        peerConnection.signal(signal);
      });

      connectionRef.current = peerConnection;
    } catch (error) {
      console.error(error.message);
    }
  };

  const addUserId = (userId) => {
    socket.current.emit('sentUserId', userId);
  };

  const disconnectUser = (userId) => {
    socket.current.emit('disconnect-user', userId);
  };

  const leaveCall = () => {
    setCallEnded(true);
    
    stream?.getTracks().forEach(track => track.stop());

    if (connectionRef.current) {
      connectionRef.current.close();
    }

    // window.location.reload();
  };

  





  // const callUser = async (id) => {
  //   try {
  //     socket.emit("getSocketId", id);

  //     const userSocketId = await new Promise( (resolve) => {

  //       socket.on("getSocketId", (socketId) => {
  //         // socketId = socketIdFromBackent;
  //         resolve(socketId);
  //       });
  //     })
    

    
  //     const peer = new Peer({
  //       initiator: true,
  //       trickle: false,
  //       stream,
  //       config: {
  //         iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  //         sdpTransform: (sdp) => {
  //           sdp = sdp.replace(
  //             /a=mid:video\r\n/g,
  //             "a=mid:video\r\nb=AS:56000\r\n"
  //           ); // Adjust maxBitrate to 56000 kbps (56 Mbps)
  //           return sdp;
  //         },
  //       },
  //     });
  //     console.log(peer,"SocketIdFromBackend",userSocketId);

  //     peer.on("signal", (data) => {
      
  //       socket.emit("callUser", {
  //         userToCall: userSocketId,
  //         signalData: data,
  //         from: me,
  //         name,
  //       });
  //     });

  //     peer.on("stream", (currentStream) => {
  //       console.log("Stream received:", {
  //         id: currentStream.id,
  //         active: currentStream.active,
  //         tracks: currentStream.getTracks().map(track => ({
  //           kind: track.kind,
  //           label: track.label,
  //           readyState: track.readyState
  //         })),
  //       });
  //       userVideo.current.srcObject = currentStream;
  //     });



  //     socket.on("callAccepted", (signal) => {
  //       setCallAccepted(true);

  //       peer.signal(signal);
  //     });

  //     connectionRef.current = peer;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const addUserId = (userId) => {
  //   socket.emit("sentUserId", userId);
  // };

  // const disconnectUser = (userId) => {
  //   socket.emit("disconnect-user", userId);
  // };

  // const leaveCall = () => {
  //   setCallEnded(true);
    
  //   stream?.getTracks().forEach(track => track.stop())

  //   if (connectionRef.current) {
  //     connectionRef.current.destroy();
  //   }

  //   // window.location.reload();
  // };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        shareScreen,
        stopScreenSharing,
        isScreenSharing,
        PageTrigger,
        setPageTrigger,
        myId,
        addUserId,
        disconnectUser,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider , SocketContext };
