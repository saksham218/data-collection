import React from 'react'
import { useState } from "react";
import { Typography, TextField, Menu, MenuItem, Select, FormControl, InputLabel, FormGroup, Box, Button } from "@mui/material";
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
var randomstring = require("randomstring");

const Home = () => {

    const navigate = useNavigate();
    // const [name, setName] = useState("");
    const [gender, setGender] = useState("female");
    const [age, setAge] = useState(0);
    // const [dob, setDob] = useState(null);
    // const [state, setState] = useState("");
    // const [videoBlob, setVideoBlob] = useState(null);
    // const [audioBlob, setAudioBlob] = useState(null);
    // const [imageBlob, setImageBlob] = useState(null);
    // const [isVideo, setIsVideo] = useState(false);
    // const [isAudio, setIsAudio] = useState(false);
    // const [isImage, setIsImage] = useState(false);

    const [statesVisited, setStatesVisited] = useState([]);
    const [languagesSpoken, setLanguagesSpoken] = useState([]);
    const [controlledLanguageBlobs, setControlledLanguageBlobs] = useState([]);
    const [ownLanguageBlobs, setOwnLanguageBlobs] = useState([]);
    // const [imageBlobs, setImageBlobs] = useState([null, null, null]);

    const [step, setStep] = useState(1);

    const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
        'Jharkhand', 'Karnataka', 'Kearla', 'Madya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
        'Sikkim', 'Tamil Nadu', 'Telagana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

    const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati', 'Bengali', 'Odia', 'Punjabi', 'Assamese', 'Kashmiri', 'Sindhi', 'Urdu', 'Konkani', 'Manipuri', 'Nepali', 'Bodo', 'Dogri', 'Maithili', 'Santali', 'Sanskrit', 'Sindhi', 'Urdu']
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
                    return { stateName: s.stateName, durationLived: s.durationLived }
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
                    // navigate('/thankyou');
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


    return (
        <div>
            <Link to="/aboutus">About Us</Link>
            <h1>Data Collection Platform</h1>
            {/* <TextField label="Name" gutterBottom value={name} onChange={(e) => { setName(e.target.value) }} /> */}
            {step === 1 ? <Box><Box>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        onChange={(e) => { setGender(e.target.value) }}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                        <FormControlLabel value="preferNotToSay" control={<Radio />} label="Prefer Not To Say" />
                    </RadioGroup>
                </FormControl>
            </Box>

                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            </LocalizationProvider> */}

                <Typography>Enter Age in years</Typography>

                <InputNumber min={0} value={age}
                    showButtons
                    placeholder='Age in years'
                    onChange={(e) => { setAge(e.value); }} />
                <Button variant="contained" color="primary" onClick={nextStep}> Next</Button>
            </Box> : null}

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


            {step === 2 ? <Box>
                {statesVisited.map((s, index) => <State s={s} index={index} states={states} setStatesVisited={setStatesVisited} statesVisited={statesVisited} />)}
                <Button variant="contained" color="primary" disabled={(statesVisited.length > 0 && statesVisited[statesVisited.length - 1].stateName === "") ? true : false}
                    onClick={() => setStatesVisited([...statesVisited, { stateName: "", durationLived: 0 }])}> Add State</Button>

                <Button variant="contained" color="primary" onClick={prevStep}> Previous</Button>
                <Button variant="contained" color="primary" onClick={nextStep}
                    disabled={(statesVisited.map(s => { return s.stateName }).includes("")) ? true : false}
                > Next</Button>

            </Box> : null}

            {/* 
            <ImageCapturer setImageBlob={setImageBlob} setIsImage={setIsImage} />
            <VideoRecorder setVideoBlob={setVideoBlob} setIsVideo={setIsVideo} />
            <AudioRecorder setAudioBlob={setAudioBlob} setIsAudio={setIsAudio} />
            <Button variant="contained" color="primary" onClick={submitData}
                disabled={(isVideo && isAudio && isImage && name !== "" && state !== "") ? false : true}>
                Submit
            </Button> */}

            {step === 3 ? <Box><Box>
                {languagesSpoken.map((l, index) => <Language l={l} index={index} proficiencies={proficiencies} languages={languages} setLanguagesSpoken={setLanguagesSpoken} languagesSpoken={languagesSpoken} statesVisited={statesVisited} states={states} controlledLanguageBlobs={controlledLanguageBlobs} setControlledLanguageBlobs={setControlledLanguageBlobs} ownLanguageBlobs={ownLanguageBlobs} setOwnLanguageBlobs={setOwnLanguageBlobs} />)}
                <Button variant="contained" color="primary"
                    disabled={languagesSpoken.length > 0 && (languagesSpoken[languagesSpoken.length - 1].languageName === ""
                        || languagesSpoken[languagesSpoken.length - 1].proficiency === ""
                        || languagesSpoken[languagesSpoken.length - 1].learnedInState === ""
                        || (languagesSpoken[languagesSpoken.length - 1].proficiency === proficiencies[1] && ownLanguageBlobs[ownLanguageBlobs.length - 1] === null)
                        || ((languagesSpoken[languagesSpoken.length - 1].proficiency === proficiencies[2] || languagesSpoken[languagesSpoken.length - 1].proficiency === proficiencies[3])
                            && (ownLanguageBlobs[ownLanguageBlobs.length - 1] === null || controlledLanguageBlobs[controlledLanguageBlobs.length - 1] === null))) ? true : false}
                    onClick={() => { setLanguagesSpoken([...languagesSpoken, { languageName: '', proficiency: '', mode: '', learnedInState: '' }]); setControlledLanguageBlobs([...controlledLanguageBlobs, null]); setOwnLanguageBlobs([...ownLanguageBlobs, null]); }}> Add Language</Button>
            </Box>

                <Button variant="contained" color="primary" onClick={prevStep}> Previous</Button>
                <Button variant="contained" color="primary" onClick={submitData}
                    // disabled={(isVideo && isAudio && isImage && name !== "" && state !== "") ? false : true}
                    disabled={languagesSpoken.length > 0 && ((languagesSpoken.map(l => { return l.languageName }).includes("")
                        || languagesSpoken.map(l => { return l.proficiency }).includes("")
                        || languagesSpoken.map(l => { return l.learnedInState }).includes("")
                        || (languagesSpoken[languagesSpoken.length - 1].proficiency === proficiencies[1] && ownLanguageBlobs[ownLanguageBlobs.length - 1] === null)
                        || ((languagesSpoken[languagesSpoken.length - 1].proficiency === proficiencies[2] || languagesSpoken[languagesSpoken.length - 1].proficiency === proficiencies[3])
                            && (ownLanguageBlobs[ownLanguageBlobs.length - 1] === null || controlledLanguageBlobs[controlledLanguageBlobs.length - 1] === null)))) ? true : false}
                >
                    Submit
                </Button>
            </Box> : null}
        </div>
    );
}

export default Home;
