import React, { useState, useRef, useEffect } from 'react';
import { BsMicMuteFill, BsMicFill, BsCameraVideoOff, BsCameraVideo, BsDisplay, BsChatLeft, BsPeople, BsTelephoneX } from 'react-icons/bs';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setCameraOn] = useState(true);
  const [isScreenSharing, setScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle device permissions and video stream
  useEffect(() => {
    const setupVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setCameraOn(false); // Set camera state to false if there's an error
      }
    };

    setupVideo();

    // Enhanced cleanup function
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => {
          track.stop();
          streamRef.current.removeTrack(track);
        });
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        streamRef.current = null;
      }
    };
  }, []);

  const toggleMic = () => {
    try {
      if (streamRef.current) {
        const audioTrack = streamRef.current.getAudioTracks()[0];
        if (audioTrack) {
          audioTrack.enabled = !isMicOn;
          setIsMicOn(!isMicOn);
        }
      }
    } catch (error) {
      console.error('Error toggling microphone:', error);
    }
  };

  const toggleCamera = async () => {
    try {
      setIsLoading(true);
      if (streamRef.current) {
        if (isCameraOn) {
          // Stop all video tracks
          const videoTracks = streamRef.current.getVideoTracks();
          videoTracks.forEach(track => {
            track.stop();  // Stop the track
            streamRef.current.removeTrack(track);  // Remove it from the stream
          });
          
          // Clear the video element's source
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
          
          // Create a new stream with only audio
          const audioTrack = streamRef.current?.getAudioTracks()[0];
          if (audioTrack) {
            streamRef.current = new MediaStream([audioTrack]);
          }
          
          setCameraOn(false);
        } else {
          try {
            // Get new video stream
            const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
            const newVideoTrack = newStream.getVideoTracks()[0];
            
            // Get current audio track if it exists
            const audioTrack = streamRef.current?.getAudioTracks()[0];
            
            // Create new stream with both tracks
            const combinedStream = new MediaStream([
              newVideoTrack,
              ...(audioTrack ? [audioTrack] : [])
            ]);
            
            // Update refs and video element
            streamRef.current = combinedStream;
            if (videoRef.current) {
              videoRef.current.srcObject = combinedStream;
            }
            
            setCameraOn(true);
          } catch (err) {
            console.error("Error restarting camera:", err);
            setCameraOn(false);
          }
        }
      }
    } catch (error) {
      console.error('Error toggling camera:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleScreenShare = () => setScreenSharing(!isScreenSharing);
  const toggleChat = () => setShowChat(!showChat);
  const toggleParticipants = () => setShowParticipants(!showParticipants);

  return (
    <div className="container mx-auto px-4 py-6 h-full">
      <div className="video-wrapper">
        <div className="video-view">
          <video 
            ref={videoRef}
            className="video"
            autoPlay
            playsInline
            muted
          />
          
          {/* Camera Off Message */}
          {!isCameraOn && (
            <div className="camera-off-message">
              Your Camera is off
            </div>
          )}

          {/* Control Bar */}
          <div className="control-bar">
            <button 
              onClick={toggleMic}
              className={`p-3 rounded-full ${!isMicOn ? 'bg-red-600' : 'bg-gray-600'} hover:bg-opacity-80 transition-colors`}
            >
              {isMicOn ? <BsMicFill className="text-white text-xl" /> : <BsMicMuteFill className="text-white text-xl" />}
            </button>

            <button 
              onClick={toggleCamera}
              disabled={isLoading}
              className={`p-3 rounded-full ${!isCameraOn ? 'bg-red-600' : 'bg-gray-600'} hover:bg-opacity-80 transition-colors`}
            >
              {isLoading ? (
                <span className="animate-spin">⌛</span>
              ) : (
                isCameraOn ? <BsCameraVideo className="text-white text-xl" /> : <BsCameraVideoOff className="text-white text-xl" />
              )}
            </button>

            <button 
              onClick={toggleScreenShare}
              className="p-3 rounded-full bg-gray-600 hover:bg-opacity-80 transition-colors"
            >
              <BsDisplay className="text-white text-xl" />
            </button>

            <button 
              onClick={toggleParticipants}
              className="p-3 rounded-full bg-gray-600 hover:bg-opacity-80 transition-colors"
            >
              <BsPeople className="text-white text-xl" />
            </button>

            <button 
              onClick={toggleChat}
              className="p-3 rounded-full bg-gray-600 hover:bg-opacity-80 transition-colors"
            >
              <BsChatLeft className="text-white text-xl" />
            </button>

            <button 
              className="p-3 rounded-full bg-gray-600 hover:bg-opacity-80 transition-colors"
            >
              <BsTelephoneX className="text-white text-xl" />
            </button>
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <div className="chat-wrapper" style={{ width: '300px' }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Chat</h3>
                <button 
                  onClick={toggleChat}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Participants Sidebar */}
          {showParticipants && (
            <div className="participant-wrapper" style={{ width: '300px' }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Participants</h3>
                <button 
                  onClick={toggleParticipants}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
