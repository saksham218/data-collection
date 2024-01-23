import React from 'react'
import { useState } from "react";
import { Typography, TextField, Menu, MenuItem, Select, FormControl, InputLabel, FormGroup, Box, Button, AppBar, CircularProgress, Input } from "@mui/material";
import VideoRecorder from "./recorders/VideoRecorder";
import AudioRecorder from "./recorders/AudioRecorder";
import ImageCapturer from './recorders/ImageCapturer';
import { postBlob, postMetaData, postBlobAzure } from '../api';
import { Link, redirect, useNavigate } from 'react-router-dom';
import State from './State';
import Language from './Language';
import { Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
// import DatePicker from 'react-date-picker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InputNumber } from 'primereact/inputnumber';


import './Home.css';

var randomstring = require("randomstring");

const Home = () => {

    const navigate = useNavigate();
    // const [name, setName] = useState("");
    const [gender, setGender] = useState("female");
    const [age, setAge] = useState('');
    const [submitting, setSubmitting] = useState(false);
    // const [dob, setDob] = useState(null);
    // const [state, setState] = useState("");
    // const [videoBlob, setVideoBlob] = useState(null);
    // const [audioBlob, setAudioBlob] = useState(null);
    // const [imageBlob, setImageBlob] = useState(null);
    // const [isVideo, setIsVideo] = useState(false);
    // const [isAudio, setIsAudio] = useState(false);
    // const [isImage, setIsImage] = useState(false);

    const [statesVisited, setStatesVisited] = useState([{ stateName: "", district: "", durationLived: '' }]);
    const [languagesSpoken, setLanguagesSpoken] = useState([{ languageName: '', proficiency: '', mode: '', learnedInState: '' }]);
    const [controlledLanguageBlobs, setControlledLanguageBlobs] = useState([]);
    const [ownLanguageBlobs, setOwnLanguageBlobs] = useState([]);
    // const [imageBlobs, setImageBlobs] = useState([null, null, null]);

    const [step, setStep] = useState(1);

    const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
        'Jharkhand', 'Karnataka', 'Kearla', 'Madya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
        'Sikkim', 'Tamil Nadu', 'Telagana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

    // const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati', 'Bengali', 'Odia', 'Punjabi', 'Assamese', 'Kashmiri', 'Sindhi', 'Urdu', 'Konkani', 'Manipuri', 'Nepali', 'Bodo', 'Dogri', 'Maithili', 'Santali', 'Sanskrit', 'Urdu']
    const languages = ['Assamese', 'Bengali', 'English', 'Gujarati', 'Hindi', 'Kannada', 'Malayalam', 'Marathi', 'Nepali', 'Odia', 'Punjabi', 'Sanskrit', 'Tamil', 'Telegu', 'Urdu']
    const proficiencies = ["Cannot speak but understand only", "Can speak only", "Can speak and read only", "Can speak, read and write"]
    // const images = ['Front', 'Left', 'Right'];

    // const submitImages = async () => {
    //     console.log("images: ", imageBlobs)
    //     const imageRes = await Promise.all(imageBlobs.map(async (blob, index) => {
    //         if (blob) {
    //             const formData = new FormData();
    //             const file = new File([blob], name + images[index] + 'Image');
    //             formData.append("file", file);
    //             const res = await postBlob(formData);
    //             return res.data;
    //         }
    //         else {
    //             return null;
    //         }
    //     }));
    //     console.log("imageRes", imageRes);
    //     return imageRes;
    // }


    const submitControlledLanguageBlobs = async (submissionId) => {
        console.log("controlledLanguageBlobs: ", controlledLanguageBlobs)
        const controlledLanguageRes = await Promise.all(controlledLanguageBlobs.map(async (blob, index) => {
            if (blob) {
                // const formData = new FormData();
                // const file = new File([blob], languagesSpoken[index].languageName + "CONTROLLED" + languagesSpoken[index].mode);
                // formData.append("file", file);
                // const res = await postBlob(formData);
                const blobName = submissionId + "CONTROLLED" + languagesSpoken[index].languageName;
                const res = await postBlobAzure(blob, blobName);
                return blobName;
            }
            else {
                return null;
            }
        }));
        console.log("controlledLanguageRes", controlledLanguageRes);
        return controlledLanguageRes;
    }

    const submitOwnLanguageBlobs = async (submissionId) => {
        console.log("ownLanguageBlobs: ", ownLanguageBlobs)
        const ownLanguageRes = await Promise.all(ownLanguageBlobs.map(async (blob, index) => {
            if (blob) {
                // const formData = new FormData();
                // const file = new File([blob], submissionId + "OWN" + languagesSpoken[index].languageName);
                // formData.append("file", file);
                // const res = await postBlob(formData);
                const blobName = submissionId + "OWN" + languagesSpoken[index].languageName;
                const res = await postBlobAzure(blob, blobName);
                return blobName;
            }
            else {
                return null;
            }
        }));
        console.log("ownLanguageRes", ownLanguageRes);
        return ownLanguageRes;
    }

    const submitData = async () => {
        // submitImages().then((imageRes) => {
        //     console.log("imageRes", imageRes);
        let submissionId = randomstring.generate({ length: 5, charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' })
        console.log("submissionId", submissionId)
        submitControlledLanguageBlobs(submissionId).then((controlledLanguageRes) => {
            console.log("controlledLanguageRes", controlledLanguageRes);

            submitOwnLanguageBlobs(submissionId).then((ownLanguageRes) => {
                console.log("ownLangaugeRes", ownLanguageRes);
                let statesVisitedData = statesVisited.map((s, index) => {
                    return { stateName: s.stateName, district: s.district, durationLived: s.durationLived }
                })

                let languagesSpokenData = languagesSpoken.map((l, index) => {
                    return {
                        languageName: l.languageName,
                        proficiency: l.proficiency,
                        learnedInState: l.learnedInState,
                        // mode: l.mode,
                        // languageBlobId: languageRes[index] ? languageRes[index].id : null,
                        // languageBlobName: languageRes[index] ? languageRes[index].name : null
                        // controlledLanguageBlobId: controlledLanguageRes[index] ? controlledLanguageRes[index].id : null,
                        controlledLanguageBlobName: controlledLanguageRes[index],

                        // ownLanguageBlobId: ownLanguageRes[index] ? ownLanguageRes[index].id : null,
                        ownLanguageBlobName: ownLanguageRes[index],

                    }
                })

                const metadata = {
                    submissionId: submissionId,
                    // name: name,
                    // dateOfBirth: dob,
                    age: age,
                    gender: gender,
                    // images: imagesData,
                    states: statesVisitedData,
                    languages: languagesSpokenData,
                }

                console.log("metadata", metadata);
                const metaadataRes = postMetaData(metadata).then((res) => {
                    console.log("metaadataRes", res.data);
                    setSubmitting(false);
                    navigate('/thankyou');
                });
            })

            // let imagesData = {
            //     frontImageBlobId: imageRes[0] ? imageRes[0].id : null,
            //     frontImageBlobName: imageRes[0] ? imageRes[0].name : null,
            //     leftImageBlobId: imageRes[1] ? imageRes[1].id : null,
            //     leftImageBlobName: imageRes[1] ? imageRes[1].name : null,
            //     rightImageBlobId: imageRes[2] ? imageRes[2].id : null,
            //     rightImageBlobName: imageRes[2] ? imageRes[2].name : null
            // }


        })
        // })
    }
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
    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setStep(step - 1);
    }


    const statesNotValid = () => {
        return (statesVisited.length === 0 || statesVisited.map(s => { return s.stateName }).includes("") || statesVisited.map(s => { return s.durationLived }).includes("") || statesVisited.map(s => { return s.district }).includes(""))
    }

    const languagesNotValid = () => {
        return languagesSpoken.length === 0 || ((languagesSpoken.map(l => { return l.languageName }).includes("")
            || languagesSpoken.map(l => { return l.proficiency }).includes("")
            || languagesSpoken.map(l => { return l.learnedInState }).includes("")
            || (languagesSpoken[languagesSpoken.length - 1].proficiency === proficiencies[1] && ownLanguageBlobs[ownLanguageBlobs.length - 1] === null)
            || ((languagesSpoken[languagesSpoken.length - 1].proficiency === proficiencies[2] || languagesSpoken[languagesSpoken.length - 1].proficiency === proficiencies[3])
                && (ownLanguageBlobs[ownLanguageBlobs.length - 1] === null || controlledLanguageBlobs[controlledLanguageBlobs.length - 1] === null))))
    }


    return (
        <div>
            <CircularProgress style={{ 'display': submitting ? 'block' : 'none' }}
                sx={{ margin: { xs: '225px', md: '200px', lg: '200px' }, ml: { xs: '115px', md: '500px', lg: '600px' } }}
            />
            <Box style={{ 'display': !submitting ? 'block' : 'none' }}
                sx={{ width: { xs: '650px', md: '900px', lg: '1150px' } }}>
                <Box >



                    {/* <Typography style={{
                        'color': 'black', 'fontWeight': '600', 'fontFamily': "'Quicksand', sans-serif",
                    }}
                        sx={{ pl: { xs: '0px', md: '75px', lg: '150px' }, left: { xs: '0px' }, fontSize: { xs: "25px", md: "28px", lg: '30px' } }}
                    >Data Collection Platform </Typography> */}

                    {/* <Button to="/aboutus"
                        style={{ 'top': '0', 'right': '0' }}
                    >ABOUT US</Button> */}

                    <Box sx={{ ml: { xs: '60px', md: '250px', lg: '475px' }, mt: '10px' }} >
                        <Typography variant='h2' style={{ 'textAlign': 'left', 'fontWeight': '600', 'fontFamily': "'Quicksand', sans-serif" }} sx={{ fontSize: { xs: "25px", md: "28px", lg: '30px' } }}>Data Collection Platform</Typography>
                    </Box>


                    <Box sx={{ mt: '10px', pl: { sm: '0px', md: '250px', lg: '275px' } }}>
                        <AppBar style={{ 'backgroundColor': 'white', 'zIndex': '0', 'height': '0px', 'position': 'absolute' }}
                            sx={{ mr: { xs: '30px', md: '35px', lg: '55px' } }}>
                            <ul id="nav-list">
                                <li onClick={() => { setStep(1) }}
                                    style={step === 1 ? { 'textDecoration': 'underline', 'color': 'black', 'textDecorationColor': 'black', 'fontWeight': '600' } : { 'listStyleType': 'none', 'padding': '20px', 'borderRadius': '10px', 'transition': 'background 1s', 'color': 'grey', 'fontWeight': '500', 'fontSize': '20px' }}>Metadata</li>
                                <li onClick={() => { if (step == 3 || age !== "") setStep(2) }}
                                    style={step === 2 ? { 'textDecoration': 'underline', 'color': 'black', 'textDecorationColor': 'black', 'fontWeight': '600' } : { 'listStyleType': 'none', 'padding': '20px', 'borderRadius': '10px', 'transition': 'background 1s', 'color': 'grey', 'fontWeight': '500', 'fontSize': '20px' }}>Domiciles</li>
                                <li onClick={() => { if (!statesNotValid() && age !== "") setStep(3) }}
                                    style={step === 3 ? { 'textDecoration': 'underline', 'color': 'black', 'textDecorationColor': 'black', 'fontWeight': '600' } : { 'listStyleType': 'none', 'padding': '20px', 'borderRadius': '10px', 'transition': 'background 1s', 'color': 'grey', 'fontWeight': '500', 'fontSize': '20px' }}>Languages</li>
                            </ul>
                        </AppBar>
                    </Box>
                </Box>
                {/* <TextField label="Name" gutterBottom value={name} onChange={(e) => { setName(e.target.value) }} /> */}
                {
                    step === 1 ?
                        <Box style={{ 'marginBottom': '10px' }}>
                            <Box style={{ 'backgroundColor': '#dedede', 'marginTop': '100px', 'borderRadius': '10px', 'paddingBottom': '10px', 'paddingTop': '10px' }}
                                sx={{ ml: { xs: '25px', md: '400px', lg: '400px' }, width: { xs: '350px', md: '375px', lg: '500px' }, height: { xs: '300px', md: '200px', lg: '200px' } }}>
                                <Box>
                                    <FormControl >
                                        <FormLabel id="demo-radio-buttons-group-label" style={{ 'color': 'black', 'fontSize': '20px', 'fontWeight': '1000', }}>Gender</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            style={{ 'display': 'flex' }}
                                            sx={{ flexDirection: { xs: 'column', md: 'row', lg: 'row' } }}


                                            onChange={(e) => { setGender(e.target.value) }}>
                                            <FormControlLabel value="female" control={<Radio sx={{

                                                '&.Mui-checked': {
                                                    color: 'black',
                                                }
                                            }} />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio sx={{

                                                '&.Mui-checked': {
                                                    color: 'black',
                                                }
                                            }} />} label="Male" style={{ 'color': 'black' }} />
                                            <FormControlLabel value="other" control={<Radio sx={{

                                                '&.Mui-checked': {
                                                    color: 'black',
                                                }
                                            }} />} label="Other" style={{ 'color': 'black' }} />
                                            <FormControlLabel value="preferNotToSay" control={<Radio sx={{

                                                '&.Mui-checked': {
                                                    color: 'black',
                                                }
                                            }} />} label="Prefer Not To Say" style={{ 'color': 'black' }} />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>


                                <Box >
                                    <Typography style={{ 'paddingTop': '20px', 'color': 'black', 'fontSize': '20px', 'fontWeight': '1000' }}>Age<Typography syle={{ 'fontWeight': '300' }}></Typography></Typography>

                                    <Input type='number' min={1} value={age}
                                        placeholder='in years'
                                        // classes={{ focused: 'custom-focused-input' }}


                                        style={{ 'border': 'none', 'borderBottom': '2px solid black', 'padding': '5px 10px', 'outline': 'none', 'backgroundColor': '#dedede' }}

                                        // showButtons
                                        // placeholder='Age in years'
                                        onChange={(e) => { setAge(e.target.value); console.log(age) }} />
                                </Box>
                            </Box>
                            <Box sx={{ pl: { xs: '35px', md: '115px', lg: '150px' } }}>
                                <Button variant="contained" color="primary" onClick={nextStep}
                                    style={{ 'marginTop': '20px', 'backgroundColor': (age === 0 || age === '') ? '#dedede' : 'black', 'color': 'white' }}

                                    disabled={(age === 0 || age === '') ? true : false}
                                > Next</Button>
                            </Box>
                        </Box> : null
                }

                {/* <Box >
                <FormControl style={{ width: "225px" }}>
                    <InputLabel>State</InputLabel>
                    <Select label="State" value={state} onChange={(e) => setState(e.target.value)}>
                        {states.map(s => <MenuItem value={s}>{s}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box> */}

                {/* <Box>
                {images.map((i, index) => <Box><Typography variant='h2'>{i} Image</Typography><ImageCapturer index={index} imageBlobs={imageBlobs} setImageBlobs={setImageBlobs} /></Box>)}
            </Box> */}


                {
                    step === 2 ?
                        <Box style={{ 'paddingTop': '80px' }}>
                            <Box>
                                {/* <Box style={{ 'position': 'fixed', 'marginTop': '10px' }}
                                    sx={{ ml: { xs: '450px', md: '600px', lg: '900px' } }}>
                                    <Button variant="contained" color="primary" disabled={statesNotValid() ? true : false}
                                        onClick={() => setStatesVisited([...statesVisited, { stateName: "", district: "", durationLived: '' }])}>
                                        Add State</Button>
                                </Box> */}
                                {statesVisited.map((s, index) => <State s={s} index={index} states={states} setStatesVisited={setStatesVisited} statesVisited={statesVisited} />)}
                            </Box>
                            <Box style={{ 'padding': '10px' }} sx={{ ml: { xs: '0px', lg: '150px' }, mr: { xs: '200px', lg: '0px' } }}>
                                <Button variant="contained" color="primary" style={{ 'backgroundColor': 'black', 'color': 'white' }}
                                    sx={{ mr: { xs: '20px', md: '10px', lg: '70px' } }}
                                    onClick={prevStep}> Previous</Button>
                                <Button variant="contained" color="primary" disabled={statesNotValid() ? true : false}
                                    onClick={() => setStatesVisited([...statesVisited, { stateName: "", district: "", durationLived: '' }])}
                                    style={{ 'backgroundColor': statesNotValid() ? '#dedede' : 'black' }}>
                                    Add State</Button>
                                <Button variant="contained" color="primary" style={{ 'backgroundColor': statesNotValid() ? '#dedede' : 'black', 'color': 'white' }}
                                    sx={{ ml: { xs: '20px', md: '10px', lg: '70px' } }}
                                    onClick={nextStep}
                                    disabled={statesNotValid() ? true : false}
                                > Next</Button>
                            </Box>
                        </Box> : null
                }

                {/* 
            <ImageCapturer setImageBlob={setImageBlob} setIsImage={setIsImage} />
            <VideoRecorder setVideoBlob={setVideoBlob} setIsVideo={setIsVideo} />
            <AudioRecorder setAudioBlob={setAudioBlob} setIsAudio={setIsAudio} />
            <Button variant="contained" color="primary" onClick={submitData}
                disabled={(isVideo && isAudio && isImage && name !== "" && state !== "") ? false : true}>
                Submit
            </Button> */}

                {
                    step === 3 ?
                        <Box style={{ 'paddingTop': '80px' }}>
                            <Box>
                                {/* <Box style={{ 'position': 'fixed' }}
                                    sx={{ ml: { xs: '450px', md: '700px', lg: '1050px' }, mt: '10px' }}>
                                    <Button variant="contained" color="primary"
                                        disabled={languagesNotValid() ? true : false}
                                        onClick={() => { setLanguagesSpoken([...languagesSpoken, { languageName: '', proficiency: '', mode: '', learnedInState: '' }]); setControlledLanguageBlobs([...controlledLanguageBlobs, null]); setOwnLanguageBlobs([...ownLanguageBlobs, null]); }}>
                                        Add Language
                                    </Button>
                                </Box> */}
                                {languagesSpoken.map((l, index) => <Language l={l} index={index} proficiencies={proficiencies} languages={languages} setLanguagesSpoken={setLanguagesSpoken} languagesSpoken={languagesSpoken} statesVisited={statesVisited} states={states} controlledLanguageBlobs={controlledLanguageBlobs} setControlledLanguageBlobs={setControlledLanguageBlobs} ownLanguageBlobs={ownLanguageBlobs} setOwnLanguageBlobs={setOwnLanguageBlobs} />)}

                            </Box>

                            <Box style={{ 'paddingTop': '20px', 'paddingBottom': '10px' }}
                                sx={{ pl: { xs: '0px', lg: '100px' }, pr: { xs: '205px', lg: '0px' } }}>

                                <Button variant="contained" color="primary" onClick={prevStep}
                                    style={{ 'backgroundColor': 'black', 'color': 'white' }}
                                    sx={{ mr: { xs: '30px', md: '10px', lg: '220px' } }}
                                > Previous</Button>
                                <Button variant="contained" color="primary"
                                    disabled={languagesNotValid() ? true : false}
                                    style={{ 'backgroundColor': languagesNotValid() ? '#dedede' : 'black' }}
                                    onClick={() => { setLanguagesSpoken([...languagesSpoken, { languageName: '', proficiency: '', mode: '', learnedInState: '' }]); setControlledLanguageBlobs([...controlledLanguageBlobs, null]); setOwnLanguageBlobs([...ownLanguageBlobs, null]); }}>
                                    Add Language
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => { setSubmitting(true); submitData(); }} style={{ 'backgroundColor': languagesNotValid() ? '#dedede' : 'black', 'color': 'white' }}
                                    sx={{ ml: { xs: '30px', md: '10px', lg: '220px' } }}
                                    // disabled={(isVideo && isAudio && isImage && name !== "" && state !== "") ? false : true}
                                    disabled={languagesNotValid() ? true : false}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box> : null
                }
            </Box>
        </div>
    );
}

export default Home;
