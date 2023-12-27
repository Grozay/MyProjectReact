import React from 'react';
import '../../../../../css/BasicInformation/ViewVideo/VideoModal.scss'

const VideoModal = ({ videoSrc, onClose }) => {
    return (
        <div className="video-modal-backdrop">
            <div className="video-modal">
                <video src={videoSrc} controls autoPlay />
                <button onClick={onClose} className="modal-close-button">Đóng</button>
            </div>
        </div>
    );
};

export default VideoModal;
