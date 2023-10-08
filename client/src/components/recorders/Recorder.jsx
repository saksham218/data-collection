import React from 'react'
import AudioRecorder from './AudioRecorder'
import VideoRecorder from './VideoRecorder'
import { Box } from '@mui/material'


const Recorder = ({ mode, index, controlledLanguageBlobs, setControlledLanguageBlobs, ownLanguageBlobs, setOwnLanguageBlobs }) => {
    return (
        <div>
            {/* {mode === "Audio" ? (<AudioRecorder index={index} languageBlobs={languageBlobs} setLanguageBlobs={setLanguageBlobs} />) :
                (mode === "Video" ? (<VideoRecorder index={index} languageBlobs={languageBlobs} setLanguageBlobs={setLanguageBlobs} />) : null)} */}
            {mode === "Audio" ? (<Box><AudioRecorder index={index} languageBlobs={controlledLanguageBlobs} setLanguageBlobs={setControlledLanguageBlobs} />
                <AudioRecorder index={index} languageBlobs={ownLanguageBlobs} setLanguageBlobs={setOwnLanguageBlobs} /></Box>) :
                null}

        </div>
    )
}

export default Recorder