import React from 'react'
import { useState } from "react";
import { Typography, TextField, Menu, MenuItem, Select, FormControl, InputLabel, FormGroup, Box, Button } from "@mui/material";
import VideoRecorder from "./recorders/VideoRecorder";
import AudioRecorder from "./recorders/AudioRecorder";
import ImageCapturer from './recorders/ImageCapturer';
import { postBlob, postMetaData } from '../api';
import { Link, redirect, useNavigate } from 'react-router-dom';
import State from './State';
import Language from './Language';
import { Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
// import DatePicker from 'react-date-picker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Home = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState(null);
    // const [state, setState] = useState("");
    // const [videoBlob, setVideoBlob] = useState(null);
    // const [audioBlob, setAudioBlob] = useState(null);
    // const [imageBlob, setImageBlob] = useState(null);
    // const [isVideo, setIsVideo] = useState(false);
    // const [isAudio, setIsAudio] = useState(false);
    // const [isImage, setIsImage] = useState(false);

    const [statesVisited, setStatesVisited] = useState([]);
    const [languagesSpoken, setLanguagesSpoken] = useState([]);

    const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
        'Jharkhand', 'Karnataka', 'Kearla', 'Madya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
        'Sikkim', 'Tamil Nadu', 'Telagana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

    const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati', 'Bengali', 'Odia', 'Punjabi', 'Assamese', 'Kashmiri', 'Sindhi', 'Urdu', 'Konkani', 'Manipuri', 'Nepali', 'Bodo', 'Dogri', 'Maithili', 'Santali', 'Sanskrit', 'Sindhi', 'Urdu']

    // const submitBlob = async (blob, name) => {

    //     const formData = new FormData();
    //     const file = new File([blob], name);
    //     formData.append("file", file);
    //     const res = await postBlob(formData);
    //     return res.data;

    // }
    // const submitData = async () => {
    //     console.log("image", imageBlob)
    //     console.log("video", videoBlob)
    //     console.log("audio", audioBlob)

    //     const imageRes = await submitBlob(imageBlob, name + "image");
    //     console.log("imageRes", imageRes);
    //     const videoRes = await submitBlob(videoBlob, name + "video");
    //     console.log("videoRes", videoRes);
    //     const audioRes = await submitBlob(audioBlob, name + "audio");
    //     console.log("audioRes", audioRes);

    //     const metadata = {
    //         name: name,
    //         state: state,
    //         imageId: imageRes.id,
    //         imageName: imageRes.name,
    //         videoId: videoRes.id,
    //         videoName: videoRes.name,
    //         audioId: audioRes.id,
    //         audioName: audioRes.name
    //     }
    //     console.log("metadata", metadata);
    //     const metaadataRes = await postMetaData(metadata);
    //     console.log("metaadataRes", metaadataRes.data);
    //     // navigate('/thankyou');
    // };
    return (
        <div>
            <Link to="/aboutus">About Us</Link>
            <h1>Data Collection Platform</h1>
            <TextField label="Name" gutterBottom value={name} onChange={(e) => { setName(e.target.value) }} />
            <Box>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        onChange={(e) => { setGender(e.target.value) }}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                        <FormControlLabel value="preferNotToSay" control={<Radio />} label="Prefer Not To Say" />
                    </RadioGroup>
                </FormControl>
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Date of Birth"
                    format="DD/MM/YYYY"
                    value={dob}
                    onChange={(newValue) => {
                        setDob(newValue);
                        console.log(newValue);
                        console.log(dob);
                    }}
                    renderInput={(params) => <TextField {...params} />
                    }
                />
            </LocalizationProvider>

            {/* <Box >
                <FormControl style={{ width: "225px" }}>
                    <InputLabel>State</InputLabel>
                    <Select label="State" value={state} onChange={(e) => setState(e.target.value)}>
                        {states.map(s => <MenuItem value={s}>{s}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box> */}

            <Box>
                {statesVisited.map((s, index) => <State s={s} index={index} states={states} setStatesVisited={setStatesVisited} statesVisited={statesVisited} />)}
                <Button variant="contained" color="primary" onClick={() => setStatesVisited([...statesVisited, { stateName: "", durationLived: 0 }])}> Add State</Button >
            </Box>

            {/* 
            <ImageCapturer setImageBlob={setImageBlob} setIsImage={setIsImage} />
            <VideoRecorder setVideoBlob={setVideoBlob} setIsVideo={setIsVideo} />
            <AudioRecorder setAudioBlob={setAudioBlob} setIsAudio={setIsAudio} />
            <Button variant="contained" color="primary" onClick={submitData}
                disabled={(isVideo && isAudio && isImage && name !== "" && state !== "") ? false : true}>
                Submit
            </Button> */}

            <Box>
                {languagesSpoken.map((l, index) => <Language l={l} index={index} languages={languages} setLanguagesSpoken={setLanguagesSpoken} languagesSpoken={languagesSpoken} statesVisited={statesVisited} states={states} />)}
                <Button variant="contained" color="primary" onClick={() => setLanguagesSpoken([...languagesSpoken, { languageName: '', proficiency: '', audio: '', video: '', learnedInState: '' }])}> Add Language</Button >

            </Box>
        </div>
    );
}

export default Home
