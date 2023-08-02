import React from 'react'
import { useState, useRef } from "react";
import { lzjb } from 'lzjb';

const mimeType = "video/webm";

const VideoRecorder = () => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const liveVideoFeed = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [compressedVideo, setCompressedVideo] = useState(null);
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
            console.log("videoBlob", videoBlob)
            const videoUrl = URL.createObjectURL(videoBlob);
            var reader = new window.FileReader();
            reader.readAsDataURL(videoBlob);
            reader.onloadend = () => {
                var videobase64 = reader.result;
                console.log("videobase64: ", videobase64);
                var videoutf8 = Buffer.from(videobase64, 'base64').toString('utf8');
                console.log("videoutf8: ", videoutf8);
                var compressedvideo = lzjb.compress(videoutf8, null, 9);
                console.log("compressedvideo: ", compressedvideo);
                var compressedvideoutf8 = Buffer.from(compressedvideo).toString('utf8');
                var compressedvideobase64 = Buffer.from(compressedvideo).toString('base64');
                console.log("compressedvideobase64: ", compressedvideobase64);
                var compressedvideoblob = new Blob([compressedvideobase64], { type: mimeType });
                console.log("compressedvideoblob: ", compressedvideoblob);
                var compressedvideourl = URL.createObjectURL(compressedvideoblob);
                setCompressedVideo(compressedvideourl);
                var decompressedvideo = lzjb.decompress(compressedvideo);
                console.log("decompressedvideo: ", decompressedvideo);
                var videodecompressedutf8 = Buffer.from(decompressedvideo).toString('utf8');
                var videodecompressedbase64 = Buffer.from(videodecompressedutf8).toString('base64');
                console.log("videodecompressedbase64: ", videodecompressedbase64);
                var videodecompressedblob = new Blob([videodecompressedbase64], { type: mimeType });
                console.log("videodecompressedblob: ", videodecompressedblob);
                var videodecompressedurl = URL.createObjectURL(videodecompressedblob);
                setDecompressedVideo(videodecompressedurl);
            };
            // console.log("Video: ", videoChunks);
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
                        <a download href={compressedVideo}>
                            compressed Recording
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