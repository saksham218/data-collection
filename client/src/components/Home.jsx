import React from 'react'
import { useState } from "react";
import VideoRecorder from "./recorders/VideoRecorder";
import AudioRecorder from "./recorders/AudioRecorder";

const Home=()=>{
    let [recordOption, setRecordOption] = useState("video");
    const toggleRecordOption = (type) => {
        return () => {
            setRecordOption(type);
        };
    };
    return (
        <div>
            <h1>Data Collection Platform</h1>
            <div className="button-flex">
                <button onClick={toggleRecordOption("video")}>
                  Record Video
                </button>
                <button onClick={toggleRecordOption("audio")}>
                  Record Audio
                </button>
            </div>
            <div>
                {recordOption === "video" ? <VideoRecorder /> : <AudioRecorder />}
            </div>
        </div>
    );
}

export default Home
