import React from 'react'
import AudioRecorder from './AudioRecorder'


const Recorder = ({ mode }) => {
    return (
        <div>
            {mode === "audio" ? (<AudioRecorder />) : (<VideoRecorder />)}
        </div>
    )
}

export default Recorder