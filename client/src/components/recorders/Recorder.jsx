import React from 'react'
import AudioRecorder from './AudioRecorder'
import VideoRecorder from './VideoRecorder'
import { Box, InputLabel } from '@mui/material'


const Recorder = ({ mode, index, proficiencies, proficiency, controlledLanguageBlobs, setControlledLanguageBlobs, ownLanguageBlobs, setOwnLanguageBlobs }) => {
    return (
        <div>
            {/* {mode === "Audio" ? (<AudioRecorder index={index} languageBlobs={languageBlobs} setLanguageBlobs={setLanguageBlobs} />) :
                (mode === "Video" ? (<VideoRecorder index={index} languageBlobs={languageBlobs} setLanguageBlobs={setLanguageBlobs} />) : null)} */}
            {(index <= 2 && (proficiency === proficiencies[2] || proficiency === proficiencies[3])) ? (
                <Box>
                    <InputLabel>Controlled Language Input</InputLabel>
                    <AudioRecorder index={index} languageBlobs={controlledLanguageBlobs} setLanguageBlobs={setControlledLanguageBlobs} />
                </Box>) : null}
            {(index <= 2 && (proficiency === proficiencies[1] || proficiency === proficiencies[2] || proficiency === proficiencies[3])) ? (
                <Box>
                    <InputLabel>Own Language Input</InputLabel>
                    <AudioRecorder index={index} languageBlobs={ownLanguageBlobs} setLanguageBlobs={setOwnLanguageBlobs} />
                </Box>) : null}


        </div>
    )
}

export default Recorder