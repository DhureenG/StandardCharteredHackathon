import React, { useRef, useState, useEffect } from 'react'

const VideoAssistant = ({ onComplete }) => {
  const [recording, setRecording] = useState(false)
  const [recordedVideo, setRecordedVideo] = useState(null)
  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [videoStream, setVideoStream] = useState(null)
  const recordedChunks = useRef([])

  useEffect(() => {
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        setVideoStream(stream)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error('Error accessing media devices.', err)
      }
    }
    getMedia()

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startRecording = () => {
    recordedChunks.current = []
    if (videoStream) {
      const options = { mimeType: 'video/webm' }
      mediaRecorderRef.current = new MediaRecorder(videoStream, options)
      mediaRecorderRef.current.ondataavailable = handleDataAvailable
      mediaRecorderRef.current.start()
      setRecording(true)
    }
  }

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.current.push(event.data)
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current.stop()
    setRecording(false)
    setTimeout(() => {
      const blob = new Blob(recordedChunks.current, { type: 'video/webm' })
      const videoURL = URL.createObjectURL(blob)
      setRecordedVideo(videoURL)
    }, 500)
  }

  const handleSubmit = () => {
    // In a real app, you might upload the video blob to your backend.
    // For this demo, we simply pass the video URL back to the parent component.
    onComplete(recordedVideo)
  }

  return (
    <div className="video-assistant">
      <h2>Meet Your Virtual Branch Manager</h2>
      <video width="400" controls>
        <source src="/branchManager.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <h3>Your Video Response</h3>
      <video ref={videoRef} width="400" autoPlay muted></video>
      <div>
        {!recording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>
      {recordedVideo && (
        <div>
          <h4>Preview:</h4>
          <video src={recordedVideo} width="400" controls></video>
          <button onClick={handleSubmit}>Submit Response</button>
        </div>
      )}
    </div>
  )
}

export default VideoAssistant
