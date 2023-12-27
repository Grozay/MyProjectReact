import React, { useEffect, useState } from 'react';
import '../../../../../css/BasicInformation/VideoUploadSection/VideoUploadSection.scss';
import FileDropArea from '../Tool/FileDropArea';
import VideoEditModal from '../VideoEditmodal/VideoEditmodal';

const VideoUploadSection = ({ selectedVideo, handleFileButtonClick, onDrop, onDragOver, handleFiles, removeVideo }) => {
    const [isVideoEditModalOpen, setVideoEditModalOpen] = useState(false);
    const [cutRange, setCutRange] = useState([0, 0]);

    const handleVideoSelect = (file) => {
        handleFiles(file, 'video');
        setVideoEditModalOpen(true);
    };

    useEffect(() => {
        if (selectedVideo) {
            setVideoEditModalOpen(true);
        }
    }, [selectedVideo]);

    return (
        <div className="video-upload-container">
            {selectedVideo && (
                <div className="video-preview-container">
                    <video src={selectedVideo} className="video-preview" />
                    <div className='btn_container'>
                        <button onClick={() => setVideoEditModalOpen(true)} className="view-video-button">
                            <i className="fa-regular fa-eye fa-xl"></i>
                        </button>
                        <button onClick={removeVideo} className="remove-video-button">
                            <i className="fa-regular fa-trash-can fa-xl"></i>
                        </button>
                    </div>
                </div>
            )}
            {!selectedVideo && (
                <FileDropArea
                    type="video"
                    handleFileButtonClick={handleFileButtonClick}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    handleFiles={handleFiles}
                    iconClass="fa-solid fa-file-video fa-xl"
                />
            )}
            <VideoEditModal
                isOpen={isVideoEditModalOpen}
                videoSrc={selectedVideo}
                onSave={(start, end) => {
                    setCutRange([start, end]);
                    setVideoEditModalOpen(false);
                    // Xử lý lưu chỉnh sửa video ở đây
                    setVideoEditModalOpen(false);
                }}
                onClose={() => setVideoEditModalOpen(false)}
            />
        </div>
    );
};

export default VideoUploadSection;
