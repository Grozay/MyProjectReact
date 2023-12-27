import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../../../../css/BasicInformation/ViewVideo/VideoModal.scss'

const VideoEditModal = ({ isOpen, videoSrc, onSave, onClose }) => {
    const [timeRange, setTimeRange] = useState([0, 60]);
    const [videoDuration, setVideoDuration] = useState(60);

    useEffect(() => {
        // Load video và lấy thời lượng
        const videoElement = document.createElement('video');
        videoElement.src = videoSrc;
        videoElement.preload = 'metadata';

        videoElement.onloadedmetadata = function () {
            setVideoDuration(videoElement.duration);
            setTimeRange([0, videoElement.duration]);
        };
    }, [videoSrc]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(timeRange[0], timeRange[1]);
    };

    const handleSliderChange = (value) => {
        setTimeRange(value);
    };

    const remainingTime = timeRange[1] - timeRange[0]; // Tính thời gian còn lại

    return (
        <div className="modal_video">
            <div className="modal-content_video">
                <video src={videoSrc} controls className="video-preview_modal"></video>
                <Slider
                    range
                    min={0}
                    max={videoDuration}
                    value={timeRange}
                    onChange={handleSliderChange}
                />
                <p className='p_time_video'>Thời gian còn lại: {remainingTime.toFixed(2)} giây</p>
                <div className='btn_container_video'>
                    <button onClick={onClose} className='btn_video_close'>Hủy</button>
                    <button onClick={handleSave} className='btn_video_save'>Xác nhận</button>
                </div>
            </div>
        </div>
    );
};

export default VideoEditModal;
