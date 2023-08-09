import React from 'react'
import { useState, useRef } from "react";
// import { lzjb } from 'lzjb';
import { Button } from '@mui/material'
import { Base64String } from '../../utils/base64-string';
import { b64toBlob } from '../../utils/base64toblob';

const mimeType = "video/webm";

const VideoRecorder = ({ setVideoBlob }) => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const liveVideoFeed = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);
    const [recordedVideo, setRecordedVideo] = useState(null);

    const [decompressedVideo, setDecompressedVideo] = useState(null);

    const getCameraPermission = async () => {
        setRecordedVideo(null);
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };
                const audioConstraints = { audio: true };
                // create audio and video streams separately
                const audioStream = await navigator.mediaDevices.getUserMedia(
                    audioConstraints
                );
                const videoStream = await navigator.mediaDevices.getUserMedia(
                    videoConstraints
                );
                setPermission(true);
                //combine both audio and video streams
                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);
                setStream(combinedStream);
                //set videostream to live feed player
                liveVideoFeed.current.srcObject = videoStream;
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        const localVideoChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            // console.log("event", event)
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            // console.log("", event.data)
            localVideoChunks.push(event.data);
            console.log("local chunks", localVideoChunks);
            console.log("video chunks", videoChunks.length);
        };

        console.log("local chunks", localVideoChunks);
        setVideoChunks(localVideoChunks);
        console.log("set");
    };

    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        console.log("video chunks", videoChunks.length)
        mediaRecorder.current.stop();
        console.log("video chunks", videoChunks.length)
        mediaRecorder.current.onstop = () => {
            console.log("video chunks", videoChunks.length)
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            console.log("videoBlob", videoBlob);
            setVideoBlob(videoBlob);
            const videoUrl = URL.createObjectURL(videoBlob);
            setRecordedVideo(videoUrl);
            setVideoChunks([]);
        };
    };

    return (
        <div>
            <h2>Video Recorder</h2>
            <main>
                <div className="video-controls">
                    {!permission ? (
                        <button onClick={getCameraPermission} type="button">
                            Get Camera
                        </button>
                    ) : null}
                    {permission && recordingStatus === "inactive" ? (
                        <button onClick={startRecording} type="button">
                            Start Recording
                        </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <button onClick={stopRecording} type="button">
                            Stop Recording
                        </button>
                    ) : null}

                </div>
            </main>
            <div className="video-player">
                {!recordedVideo ? (
                    <video ref={liveVideoFeed} autoPlay className="live-player"></video>
                ) : null}
                {recordedVideo ? (
                    <div className="recorded-player">
                        <video className="recorded" src={recordedVideo} controls></video>
                        <a download href={recordedVideo}>
                            Download Recording
                        </a>

                        <a download href={decompressedVideo}>
                            decompressed Recording
                        </a>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default VideoRecorder