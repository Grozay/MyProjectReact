import React, { useState } from 'react';

const VideoTrimmer = ({ videoSrc }) => {
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const handleTrimVideo = () => {
        // Xử lý cắt video tại đây
        console.log(`Cắt video từ ${startTime} đến ${endTime} giây.`);
    };

    return (
        <div>
            <video src={videoSrc} controls></video>
            <div>
                <label>
                    Thời gian bắt đầu:
                    <input type="number" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </label>
                <label>
                    Thời gian kết thúc:
                    <input type="number" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </label>
                <button onClick={handleTrimVideo}>Cắt Video</button>
            </div>
        </div>
    );
};

export default VideoTrimmer;
