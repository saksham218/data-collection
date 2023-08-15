import { Button } from '@mui/material'
import React, { useState, useCallback, useRef } from 'react'
import Webcam from 'react-webcam'
const WebcamComponent = () => <Webcam />
const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
}
const ImageCapturer = ({ setImageBlob, setIsImage }) => {
    const [picture, setPicture] = useState('')
    const webcamRef = useRef(null)
    const capture = useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        console.log("Image:", pictureSrc)
        setPicture(pictureSrc)
        setImageBlob(pictureSrc)
        setIsImage(true)
    })
    return (
        <div>
            <h2>Image</h2>
            <div>
                {picture === '' ? (
                    <Webcam
                        audio={false}
                        height={400}
                        ref={webcamRef}
                        width={400}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                ) : (
                    <img src={picture} />
                )}
            </div>
            <div>
                {picture !== '' ? (
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            setPicture('')
                            setIsImage(false)
                        }}

                    >
                        Retake
                    </Button>
                ) : (
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            capture()
                        }}
                        className="btn btn-danger"
                    >
                        Capture
                    </Button>
                )}
            </div>
        </div>
    )
}
export default ImageCapturer