import React from 'react'
import AudioRecorder from './AudioRecorder'
import VideoRecorder from './VideoRecorder'
import { Box, InputLabel, Typography } from '@mui/material'


const Recorder = ({ language, learnedInState, index, proficiencies, proficiency, controlledLanguageBlobs, setControlledLanguageBlobs, ownLanguageBlobs, setOwnLanguageBlobs }) => {
    return (
        <div>
            {/* {mode === "Audio" ? (<AudioRecorder index={index} languageBlobs={languageBlobs} setLanguageBlobs={setLanguageBlobs} />) :
                (mode === "Video" ? (<VideoRecorder index={index} languageBlobs={languageBlobs} setLanguageBlobs={setLanguageBlobs} />) : null)} */}
            {(index <= 2 && (proficiency === proficiencies[2] || proficiency === proficiencies[3])) ? (
                <Box>
                    <Typography variant="h6">Record audio while reading the following text</Typography>

                    <image />
                    <AudioRecorder index={index} languageBlobs={controlledLanguageBlobs} setLanguageBlobs={setControlledLanguageBlobs} />
                </Box>) : null}
            {(index <= 2 && (proficiency === proficiencies[1] || proficiency === proficiencies[2] || proficiency === proficiencies[3])) ? (
                <Box>
                    <Typography variant="h6">Record audio while speaking about how you learnt {language} in {learnedInState}</Typography>
                    <AudioRecorder index={index} languageBlobs={ownLanguageBlobs} setLanguageBlobs={setOwnLanguageBlobs} />
                </Box>) : null}


        </div>
    )
}

export default Recorder