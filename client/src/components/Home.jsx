import React from 'react'
import { useState } from "react";
import { Typography, TextField, Menu, MenuItem, Select, FormControl, InputLabel, FormGroup, Box, Button } from "@mui/material";
import VideoRecorder from "./recorders/VideoRecorder";
import AudioRecorder from "./recorders/AudioRecorder";
import ImageCapturer from './recorders/ImageCapturer';
import { postBlob, postMetaData } from '../api';
import { redirect, useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [videoBlob, setVideoBlob] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [isVideo, setIsVideo] = useState(false);
    const [isAudio, setIsAudio] = useState(false);
    const [isImage, setIsImage] = useState(false);

    const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
        'Jharkhand', 'Karnataka', 'Kearla', 'Madya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
        'Sikkim', 'Tamil Nadu', 'Telagana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

    const submitBlob = async (blob, name) => {

        const formData = new FormData();
        const file = new File([blob], name);
        formData.append("file", file);
        const res = await postBlob(formData);
        return res.data;

    }
    const submitData = async () => {
        console.log("image", imageBlob)
        console.log("video", videoBlob)
        console.log("audio", audioBlob)

        const imageRes = await submitBlob(imageBlob, name + "image");
        console.log("imageRes", imageRes);
        const videoRes = await submitBlob(videoBlob, name + "video");
        console.log("videoRes", videoRes);
        const audioRes = await submitBlob(audioBlob, name + "audio");
        console.log("audioRes", audioRes);

        const metadata = {
            name: name,
            state: state,
            imageId: imageRes.id,
            imageName: imageRes.name,
            videoId: videoRes.id,
            videoName: videoRes.name,
            audioId: audioRes.id,
            audioName: audioRes.name
        }
        console.log("metadata", metadata);
        await postMetaData(metadata);
        // navigate('/thankyou');
    };
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


            <ImageCapturer setImageBlob={setImageBlob} setIsImage={setIsImage} />
            <VideoRecorder setVideoBlob={setVideoBlob} setIsVideo={setIsVideo} />
            <AudioRecorder setAudioBlob={setAudioBlob} setIsAudio={setIsAudio} />
            <Button variant="contained" color="primary" onClick={submitData}
                disabled={(isVideo && isAudio && isImage && name !== "" && state !== "") ? false : true}>
                Submit
            </Button>
        </div>
    );
}

export default Home
