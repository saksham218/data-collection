import React from 'react'
import { useState } from "react";
import { Typography, TextField, Menu, MenuItem, Select, FormControl, InputLabel, FormGroup, Box, Button } from "@mui/material";
import VideoRecorder from "./recorders/VideoRecorder";
import AudioRecorder from "./recorders/AudioRecorder";
import ImageCapturer from './recorders/ImageCapturer';

const Home = () => {

    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [videoBlob, setVideoBlob] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [imageBlob, setImageBlob] = useState(null);

    const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
        'Jharkhand', 'Karnataka', 'Kearla', 'Madya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
        'Sikkim', 'Tamil Nadu', 'Telagana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

    const submitData = () => { };
    return (
        <div>
            <h1>Data Collection Platform</h1>
            <TextField label="Name" gutterBottom value={name} onChange={(e) => { setName(e.target.value) }} />

            <Box >
                <FormControl style={{ width: "225px" }}>
                    <InputLabel>State</InputLabel>
                    <Select label="State" value={state} onChange={(e) => setState(e.target.value)}>
                        {states.map(s => <MenuItem value={s}>{s}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>


            <ImageCapturer setImageBlob={setImageBlob} />
            <VideoRecorder setVideoBlob={setVideoBlob} />
            <AudioRecorder setAudioBlob={setAudioBlob} />
            <Button variant="contained" color="primary" onClick={submitData}>Submit</Button>
        </div>
    );
}

export default Home
