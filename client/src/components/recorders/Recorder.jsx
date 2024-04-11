import React from 'react'
import AudioRecorder from './AudioRecorder'
import VideoRecorder from './VideoRecorder'
import { Box, InputLabel, Typography } from '@mui/material'





const Recorder = ({ language, otherLanguage, learnedInState, index, proficiencies, proficiency, controlledLanguageBlobs, setControlledLanguageBlobs, ownLanguageBlobs, setOwnLanguageBlobs }) => {
    return (
        <div>
            {/* {mode === "Audio" ? (<AudioRecorder index={index} languageBlobs={languageBlobs} setLanguageBlobs={setLanguageBlobs} />) :
                (mode === "Video" ? (<VideoRecorder index={index} languageBlobs={languageBlobs} setLanguageBlobs={setLanguageBlobs} />) : null)} */}
            {(index <= 2 && (proficiency === proficiencies[2] || proficiency === proficiencies[3]) && language !== "Other") ? (
                <Box style={{ 'paddingTop': '10px' }}>
                    <Typography style={{ 'fontSize': '16px', 'fontWeight': '1000' }}>Record audio while reading the following text</Typography>
                    <Typography style={{ 'fontSize': '12px', 'fontWeight': '1000' }}>(Make sure you are in a quiet environment and keep the recording device within 15 cm from your mouth.)</Typography>


                    {/* import english image from images folder*/}
                    <img src={require(`../../images/${language}.png`)} alt={language} style={{ 'width': '250px', 'height': '225px' }} />


                    <AudioRecorder index={index} languageBlobs={controlledLanguageBlobs} setLanguageBlobs={setControlledLanguageBlobs} />
                </Box>) : null}
            {(index <= 2 && (proficiency === proficiencies[1] || proficiency === proficiencies[2] || proficiency === proficiencies[3])) ? (
                <Box style={{ 'paddingTop': '10px' }}>
                    <Typography style={{ 'fontSize': '16px', 'fontWeight': '1000' }}>Record audio while speaking about how you learnt {(language !== "Other") ? language : otherLanguage} in {learnedInState}</Typography>
                    {/* <Typography style={{ 'fontSize': '10px', 'fontWeight': '1000' }}>(Speak in {language} for 30-60 secs)</Typography> */}
                    <Typography style={{ 'fontSize': '12px', 'fontWeight': '1000' }}>(Make sure you are in a quiet environment, keep the recording device within 15 cm and speak in {(language !== "Other") ? language : otherLanguage} for 30-60 secs.)</Typography>
                    <AudioRecorder index={index} languageBlobs={ownLanguageBlobs} setLanguageBlobs={setOwnLanguageBlobs} />
                </Box>) : null}


        </div>
    )
}

export default Recorder